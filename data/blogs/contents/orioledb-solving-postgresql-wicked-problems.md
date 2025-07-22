> Alexander Korotkov, the maintainer of OrioleDB, will be talking at PGCON 23 about some of the [changes](https://www.pgcon.org/events/pgcon_2023/schedule/session/470-future-of-table-access-methods/) they are making. They are solving many ["wicked Postgres problems"](https://www.slideshare.net/AlexanderKorotkov/solving-postgresql-wicked-problems) with [dual pointers](https://www.orioledata.com/blog/buffer-management/) instead of buffer mapping, row-level WAL instead of block-level WAL, undo logs instead of bloat-prone MVCC, and index-organized tables instead of heap.

## Building a faster storage engine

Oriole acts as a drop-in replacement for the default Postgres storage engine using the Table Access Method APIs:

```sql
CREATE EXTENSION orioledb; -- enable the extension

CREATE TABLE posts (
  id INT8 NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  PRIMARY KEY (id)
) USING orioledb;    -- Specify the storage format
```

The `USING` clause might look familiar if you have used other storage engines in Postgres like [Citus columnar](https://docs.citusdata.com/en/v11.1/admin_guide/table_management.html#columnar-storage), [Hydra](https://docs.hydra.so/concepts/using-hydra-columnar), [ParadeDB](https://docs.paradedb.com/search/quickstart), or [zheap](https://github.com/cybertec-postgresql/zheap). These all use the [Table Access Method API](https://www.postgresql.org/docs/current/tableam.html) - a set of methods that provide pluggable storage.

The `orioledb` storage engine changes the representation of table data on disk. Its [architecture](https://github.com/orioledb/orioledb/blob/main/doc/arch.md) is designed to take advantage of modern hardware like SSDs and NVRAM.

It implements MVCC, the feature that allows multiple connected users to see different versions of the data depending on when their transaction started, via an UNDO log rather than tuple versioning. Orioles architecture prevents bloat and provides several features and benefits:

1. **Reduced IO:** It implements row-level WAL (Write-Ahead Log) and a non-persistent undo log. This significantly reduces IO operations for write transactions.
2. **Scalability:** It implements lockless access for in-memory data. This helps to eliminate common bottlenecks found in traditional database engines.
3. **Data Compression:** It implements page-level data compression, which can reduce the overall size of a typical database by approximately 4 to 5 times, saving storage space.
4. **Bloat Reduction:** Efficiently manages updates in-place with an undo log, which contributes to reducing database bloat — a common issue where the database size grows due to unused or obsolete data occupying space.
5. **Index-organized tables:** Oriole stores table rows in the leafs of primary key index making primary key lookups very cheap. In many cases, this saves significant storage space.

![I/O comparison](/blog/images/orioledb-solving-postgresql-wicked-problems/io-comparison.webp)

<figcaption>Reads and writes are significantly faster with Oriole</figcaption>

## Pluggable storage in Postgres

Pluggable Storage gives developers the ability to use different storage engines for different tables _within the same database_. This system is [available in MySQL](https://en.wikipedia.org/wiki/Comparison_of_MySQL_database_engines), which uses the [InnoDB](https://en.wikipedia.org/wiki/InnoDB) as the default storage engine since MySQL 5.5 (replacing p).
Pluggable Storage gives developers the ability to use different storage engines for different tables _within the same database_. This system is [available in MySQL](https://en.wikipedia.org/wiki/Comparison_of_MySQL_database_engines), which uses the [InnoDB](https://en.wikipedia.org/wiki/InnoDB) as the default storage engine since MySQL 5.5 (replacing [MyISAM]()).

Oriole aims to be a drop-in replacement for Postgres' default storage engine and supports similar use-cases with improved performance. Other storage engines, to name a few possibilities, could implement columnar storage for OLAP workloads, highly compressed timeseries storage for event data, or compressed storage for minimizing disk usage.

![Pluggable storage in Postgres](/blog/images/orioledb-solving-postgresql-wicked-problems/pluggable-storage.webp)

In version 12, PostgreSQL introduced support for pluggable storage with the goal of [adding ZHeap](https://anarazel.de/talks/2019-05-30-pgcon-pluggable-table-storage/pluggable.pdf) - a previous effort to solve some shortcomings of Postgres' default storage format. We hope to contribute towards these efforts.

OrioleDB currently requires a [set of patches to Postgres](https://github.com/orioledb/postgres/commits/patches16/) to expand on the type of features external storage engines extensions can implement. We remain committed to open source we'll work with the Oriole team and Postgres community with the goal of upstreaming patches so that Oriole can be used with any Postgres installation. We have no timeline for this, but it's safe to expect that it could be a few major Postgres versions away.

## Conclusion

OrioleDB is a new storage engine for Postgres that aims to improve performance and scalability. It uses a combination of modern hardware features and innovative algorithms to achieve these goals. The OrioleDB architecture is designed to take advantage of SSDs and NVRAM, reduce IO operations, and provide lockless access for in-memory data. It also implements data compression, bloat reduction, and index-organized tables to save storage space and improve performance. OrioleDB is a drop-in replacement for the default Postgres storage engine and supports pluggable storage, allowing developers to use different storage engines for different tables within the same database. We are excited to see how OrioleDB evolves and how it will impact the Postgres ecosystem in the future. You can find more information about OrioleDB on their [website](https://www.orioledb.com) and [GitHub repository](https://github.com/orioledb/orioledb/tree/main). Especially, check out the [architecture document](https://github.com/orioledb/orioledb/blob/main/doc/arch.md) for a deep dive into how OrioleDB works.

## References

- [OrioleDB website](https://www.orioledb.com)
- [Oriole Joins Supabase](https://supabase.com/blog/supabase-aquires-oriole)
- [Next steps for Postgres pluggable storage](https://supabase.com/blog/postgres-pluggable-strorage)
