import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
	constructor() {
		super();
		query: "";
	}

	search = () => {
		const { query } = this.state;
		const { searchFn } = this.props;
		searchFn(query);
		this.setState({ query: "" });
	};

	render() {
		return (
			<section className="Search__parent">
				<div className="Search__content">
					<input
						placeholder="Search Your Feed"
						onChange={e => this.setState({ query: e.target.value })}
						onKeyPress={e => {
							e.key == "Enter" ? this.search() : "";
						}}
					/>

					<SearchIcon id="Search__icon" onClick={this.search} />
				</div>
			</section>
		);
	}
}
