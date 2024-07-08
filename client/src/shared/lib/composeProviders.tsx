type Children = { children?: React.ReactNode }
type BaseComponent = ({ children }: Children) => React.ReactElement
type MemoComponent = React.MemoExoticComponent<BaseComponent>

type ProvidersProps = BaseComponent | MemoComponent

const composeProviders = (providers: ProvidersProps[]) =>
  providers.reduce(
    (Provider, Component) =>
      function Child({ children }) {
        return (
          <Provider>
            <Component>{children}</Component>
          </Provider>
        )
      }
  )

export { composeProviders }
