import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

type LinkProps = {
  href: string;
  children: string;
  activeclass: string;
  className: string;
};

const ActiveLink: FunctionComponent<LinkProps> = ({
  children,
  className,
  ...props
}) => {
  const { pathname } = useRouter();
  let _className = className || '';
  let _defaultClass = `${_className} text-gray-100`;

  if (pathname === props.href) {
    _className = `${_className} text-indigo-400 ${props.activeclass}`;
  } else {
    _className = _defaultClass;
  }

  return (
    <Link className={_className} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
