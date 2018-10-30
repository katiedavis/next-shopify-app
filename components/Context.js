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
          updateParentState: state => this.setState(state)
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
