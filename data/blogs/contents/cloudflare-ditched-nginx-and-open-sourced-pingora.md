![NGINXvsPingora](/blog/images/cloudflare-ditched-nginx-and-open-sourced-pingora/nginxvspingora.webp)

<figcaption>NGINX's multi-process architecture vs Pingora's multi-threaded architecture</figcaption>

## Cloudflare Ditched NGINX

### Memory Safety

NGINX is written in C, and as we all know, C is not memory safe. This means that it is easy to make mistakes that lead to memory safety issues. Pingora is a more memory safe alternative for services that are written in C/C++. While some might argue about memory safety among programming languages, Cloudflare found that the memory safety of Rust was a big win for them. Besides, as they spend less time struggling with these issues, we are more productive implementing new features.

### Multi-Process vs Multi-Threaded

NGINX is process based (like Postgres), processes are isolated and each have their own dedicated memory and having worker processes pinned to a CPU is valuable to avoid context switching. But we have to remember what NGINX is used for: **It is a reverse proxy**.

This means it needs to turn around and connect to the backend server. The worker process must do that. Which means it will create a connection, get a file descriptor and that process and that process only will be the one read and write to this backend connection. Other processes won’t see this connection. You might say so? whats bad about this.

Imagine having 40 CPU cores mapped to 40 worker processes if you used defaults. The request running in a core must pick from existing connections established only from that process or create new ones from that process even though existing connections to that backend might already exist in other processes.

This is how NGINX architecture work, this is regardless of SO_REUSEPORT or not. **This means that backend connections are scattered and isolated and can’t be reused**.

Not only you are making more connections to the backend (more CPU) you can’t use connections across process workers as the file descriptors live in the worker process and those are dedicated.

Cloudflare is building their own home grown reverese proxy (Pingora) to have a single connection pool to address this.

Could cloudflare fixed NGINX by creating a shared connection pool? probably but the cost of changing that architecture is so engraved into NGINX that a rewrite made better sense for them.

Sounds like [Envoy](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/connection_pooling) has the same problem as NGINX, connection pool per worker thread.

Now this makes me think if NGINX was multi-threaded as opposed to multi-processes the connections are essentially shared for free (parent process virtual memory space is shared between all threads and that is where connection file descriptor live)

The creator on HAProxy (Willy Tarreau) has a good write up on why he chose multi-threaded over multi-processes for HAProxy.

![Willy's X](/blog/images/cloudflare-ditched-nginx-and-open-sourced-pingora/willy-x.webp)

<figcaption>Willy's X</figcaption>

### Extensive customization

Pingora is called **programmable network services** and it is designed to be extensible. This means that you can write your own custom logic in Rust and have customized and advanced gateway or load balancer. Pingora provides powerful yet simple ways to implement it. Cloudflare provides a simple example that you can see [here](https://blog.cloudflare.com/pingora-open-source).

## References

- [Cloudflare Ditched NGINX](https://blog.cloudflare.com/cloudflare-ditches-nginx/)
- [Cloudflare ditched NGINX and it was smart](https://medium.com/@hnasr/cloudflare-ditched-nginx-and-it-was-smart-5f7708263ea7)
- [Envoy Connection Pooling](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/connection_pooling)
- [Open sourcing Pingora: our Rust framework for building programmable network services](https://blog.cloudflare.com/pingora-open-source)
