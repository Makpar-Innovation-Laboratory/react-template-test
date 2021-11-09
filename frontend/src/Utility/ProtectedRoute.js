/**
 * @component
 * 
 * @property {object} 
 */

class ProtectedRoute extends Component {
    /**
     * 
     * @returns 
     */
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