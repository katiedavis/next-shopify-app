const Context = React.createContext();

// First create a provider Component
class ContextProvider extends React.Component {
  state = {
    resources: '',
    open: false,
    clicked: false,
    item: ''
  };
  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          updateParentState: state => this.setState(state)
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

// make a consumer which will surface it
const ContextConsumer = Context.Consumer;

export default ContextProvider;
export { ContextConsumer };
