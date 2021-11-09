class ProtectedRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route 
          {...props} 
          render={props => (
            this.state.authenticated ?
              <Component {...props} /> :
              <Redirect to='/login' />
          )} 
        />
      )
    }
  }