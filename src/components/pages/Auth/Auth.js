import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classes from './Auth.module.css'
import ImageInput from './ImageInput'
import { initAuth, logout } from '../../../store/actions/auth'

class Auth extends Component {
    state = {
        email: '',
        password: '',
        username: '',
        name: '',
        avatarURL: '',
        isSignUp: false
    }

    handleChange = (field, value) => {
        // console.log(field, value)
        this.setState({
            [field]: value
        })
    }

    switchSubmitType = () => {
        this.setState(prevState => ({
            ...prevState,
            isSignUp: !prevState.isSignUp
        }))
    }

    logout = () => {
        this.props.dispatch(logout())
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('Submitted', this.state)

        // todo: dispatch auth action
        this.props.dispatch(initAuth(this.state))
    }

    render() {
        const { email, password, username, name, avatarURL, isSignUp } = this.state

        let signUpFields = null
        if (isSignUp) {
            signUpFields = (
                <Fragment>
                    <input
                        name='username'
                        type='text'
                        placeholder='Your username'
                        value={username}
                        onChange={e => this.handleChange('username', e.target.value)}
                        required
                    />
                    <input
                        name='name'
                        type='text'
                        placeholder='Your name'
                        value={name}
                        onChange={e => this.handleChange('name', e.target.value)}
                        required
                    />
                    <ImageInput
                        name='avatarURL'
                        maxHeight={128}
                        className={classes.ImageInput}
                        value={avatarURL}
                        onChange={this.handleChange}
                    />
                </Fragment>
            )
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {signUpFields}
                    <input
                        name='email'
                        type='email'
                        placeholder='Your Email'
                        value={email}
                        onChange={e => this.handleChange('email', e.target.value)}
                    />
                    <input
                        name='password'
                        type='password'
                        placeholder='Your password'
                        value={password}
                        onChange={e => this.handleChange('password', e.target.value)}
                    />
                    <button type="submit">
                        {
                            isSignUp ? 'Sign up' : 'Sign in'
                        }
                    </button>
                </form>
                <button onClick={this.switchSubmitType}>
                    Switch to {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
                {/* Test */}
                <button href='' onClick={this.logout}>
                    Logout
                </button>
            </div>
        )
    }
}

export default connect()(Auth)