declare module '*.css';

declare module '*.less';

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}

declare module '*.jpeg' {
  const url: string;
  export default url;
}

declare module '*.svg' {
  export default function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement;
}
