import Link from 'next/link';
import React from 'react';

export default function DropDownLink(props) {
	let { children, href, ...rest } = props;
	return (
		<Link href='/profile' {...rest}>
			{children}
		</Link>
	);
}
