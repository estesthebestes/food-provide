import Link from 'next/link';
import React from 'react';

// this is the component for the dropdown menu that contains only profile currently
export default function DropDownLink(props) {
	let { children, ...rest } = props;
	return (
		<Link href='/profile' {...rest}>
			{children}
		</Link>
	);
}
