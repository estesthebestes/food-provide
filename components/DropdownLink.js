import Link from 'next/link';
import React from 'react';

export default function DropDownLink(props) {
	let { children, href, ...rest } = props;
	return (
		<Link legacyBehavior href='/profile'>
			<a {...rest}>{children}</a>
		</Link>
	);
}
