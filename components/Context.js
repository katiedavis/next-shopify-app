const Context = React.createContext();

// Then create a provider Component
class ContextProvider extends React.Component {
  state = {
    resources: '',
    open: false,
    clicked: false,
    item: '',
    data: ''
  };
  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setModalToOpen: () =>
            this.setState({
              open: true
            }),
          onSelectedProducts: idsFromProducts =>
            this.setState({
              resources: idsFromProducts
            }),
          updateStateWithProduct: item =>
            this.setState({
              item: item,
              clicked: true
            })
        }}
      >
        {console.log('provider state', this.state)}
        {this.props.children}
      </Context.Provider>
    );
  }
}

// then make a consumer which will surface it
const ContextConsumer = Context.Consumer;

export default ContextProvider;
export { ContextConsumer };
