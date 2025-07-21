export default function middleware(req, res, next) {
	// // If user is authenticated, redirect to dashboard
	// const token =
	//     typeof req.cookies.token === 'string' ? req.cookies.token : null;
	// if (token) {
	//     res.redirect(302, '/');
	//     return;
	// } else {
	//     if (req.url === process.env.NEXT_PUBLIC_BASE_URL + '/admin') {
	//         redirect(302, '/login');
	//         return;
	//     }
	// }
	// next(); // Call next() to pass control to the next middleware in the stack
}

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};

// FOR MORE INFORMATION CHECK: https://nextjs.org/docs/app/building-your-application/routing/middleware
