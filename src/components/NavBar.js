import React, { Component, useState } from "react";
import { Redirect } from 'react-router-dom'
import Navbar from "reactjs-navbar";
import logo from "../images/powerset-logo.jpeg";
import { Container, Row, Col } from "reactstrap";
import { useHistory } from 'react-router-dom';
import {
	faUsers,
	faBookOpen,
	faGlobe,
	faChartPie,
	faCogs,
} from "@fortawesome/free-solid-svg-icons";

import "reactjs-navbar/dist/index.css";

const NavBar = () => {
	const history = useHistory();

	return (
		<Container style={{ margin: 0, padding: 0 }} fluid={true}>
			<Row style={{ margin: 0, padding: 0 }}>
				<Col style={{ margin: 0, padding: 0 }} xs="12">
					<Navbar
						logo={logo}
						helpCallback={() => {
							alert("I need help... and coffee...");
						}}
						menuItems={[
							{
								title: "Home",
								icon: faUsers,
								isAuth: true,
								onClick: () => {
									history.push("/");
								},
							},
							{
								title: "Job Profiles",
								icon: faBookOpen,
								isAuth: true,
								onClick: () => {
									history.push("/job-profiles");
									<Redirect to="/job-profiles"></Redirect>
								},
							},
							{
								title: "My Profile",
								icon: faGlobe,
								isAuth: true,
								onClick: () => {
									history.push("/profile");
								},
							},
							{
								title: "Interviews",
								icon: faCogs,
								isAuth: true,
							},
							{
								title: "Log out",
								icon: faChartPie,
								isAuth: true,
								onClick: () => {
									localStorage.removeItem('token');
									history.push("/");
								},
							},
						]}

					/>

				</Col>
				{/* <Col xs="1">
					<span>Logout button should be here</span>
				</Col> */}
			</Row>
		</Container>
	);

}
export default NavBar;