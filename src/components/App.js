import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";
import { notEqual } from "assert";
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";

class App extends Component {
	constructor() {
		super();

		this.state = {
			posts: []
		};

		this.url = "https://practiceapi.devmountain.com/api/posts/";

		this.updatePost = this.updatePost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.createPost = this.createPost.bind(this);
	}

	componentDidMount() {
		axios.get(this.url).then(res => {
			this.setState({
				posts: res.data
			});
		});
		// setInterval(this.keepUpdated, 5000);
		// this.keepUpdated();
	}

	updatePost(id, text) {
		axios.put(this.url + "?id=" + id, { text: [text] }).then(res => {
			this.setState({
				posts: res.data
			});
		});
	}

	deletePost(id) {
		axios.delete(this.url + "?id=" + id).then(res => {
			this.setState({
				posts: res.data
			});
		});
	}

	createPost(text) {
		axios.post(this.url, { text }).then(res => {
			this.setState({
				posts: res.data
			});
		});
	}

	searchFn = query => {
		axios.get(this.url + "/filter/?text=" + query).then(res => {
			this.setState({
				posts: res.data
			});
		});
	};

	keepUpdated = () => {
		axios.get(this.url).then(res => {
			const { posts } = this.state;
			const { data } = res;
			if (posts.length !== data.length || !this.equal(posts, data)) {
				this.setState({
					posts: data
				});
			}
		});
	};

	equal(arr1, arr2) {
		let arr1Copy = arr1.slice(),
			arr2Copy = arr2.slice();
		arr1.sort();
		arr2.sort();
	}

	render() {
		const { posts } = this.state;

		return (
			<div className="App__parent">
				<Header searchFn={this.searchFn} />
				<section className="App__content">
					<Compose createPostFn={this.createPost} />
					{posts.map(post => (
						<Post
							key={post.id}
							date={post.date}
							text={post.text}
							id={post.id}
							updatePostFn={this.updatePost}
							deletePostFn={this.deletePost}
						/>
					))}
				</section>
			</div>
		);
	}
}

export default App;
