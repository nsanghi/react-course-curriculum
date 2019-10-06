import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'

export default class Posts extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['top', 'new'])
  }

  state = {  
    posts: null,
    error: null,
    loading: true
  }

  constructor(props) {
    super(props)
    this.handleFetch = this.handleFetch.bind(this)
  }

  componentDidMount() {
    this.handleFetch()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetch()
    }
  }
  
    handleFetch() {
    this.setState({
      posts: null,
      error: null,
      loading: true
    })

    fetchMainPosts(this.props.type)
      .then((posts)=>this.setState({
        posts,
        error: null,
        loading: false
      })) 
      .catch( ({message}) => this.setState({
        error: message,
        loading: false
      }))
  }


  render() {
    const { posts, error, loading} = this.state

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <p className='center-text error'>{error}</p>
    }

    return <PostsList posts={posts} />
  }
}