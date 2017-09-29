declare module 'utils/bundle' {

  export function bundleFactory(
    Component: React.ReactType,
    modules: { [propName: string]: () => void; }
  ): (props: any) => React.ReactType | JSX.Element | any;

  export function bundleComponent(loadComponent: () => void): React.ReactType;

  interface PropsTypes {
    children: React.ReactType | JSX.Element | any;
    modules: {
      [propName: string]: () => void;
    };
  }

  interface StateTypes {
    isLoaded: boolean;
    result: object;
  }

  export default class Bundle extends React.Component<PropsTypes, StateTypes> {}
}

