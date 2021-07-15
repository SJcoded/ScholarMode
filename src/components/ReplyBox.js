/* global chrome */
import styled from 'styled-components';
import TextEditor from './TextEditor';
import { useState } from 'react';
import { Node } from 'slate';

const CustomDiv = styled.div`
	width: 100%;
	min-height: 100px;
	border: 1px solid gray;
	border-radius: 5px;
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 5px;
`;

const SubmitButton = styled.button`
	color: white;
	background-color: #da0000;
	border-radius: 10px;
	font-size: 1em;
	text-align: center;
	height: 25px;
	width: 80px;
	border: 1px;
	cursor: pointer;
`;

const CancelButton = styled.button`
	border: 0px;
	font-size: 1em;
	color: #626262;
	margin-left: 10px;
	cursor: pointer;
	background: none;
`;

const ButtonDiv = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
`;

const getProfileInfo = (token) => {
	const url = `http://localhost:8080/auth/chrome?access_token=${token}`;
	return fetch(url).then((response) => response.json());
};
function ReplyBox() {
	const [textValue, setTextValue] = useState(initialValue);

	const storeValue = () => {
		const newValue = JSON.stringify(textValue);
		console.log(newValue);
		console.log('Hey String Here');
		console.log(JSON.stringify(newValue));

		chrome.storage.sync.get(['token'], async (result) => {
			getProfileInfo(result.token).then((info) => {
				const reqBody = {
					author: info._id,
					content: JSON.stringify(newValue),
					dateCreated: new Date(),
					flagged: false,
					replies: [],
					reports: [],
					timestamp: new Date(),
					title: 'Title',
					video: 'Video',
					votes: 0,
				};

				fetch('http://localhost:8080/questions/', {
					method: 'post',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(reqBody),
				})
					.then((response) => response.json)
					.then((data) => {})
					.catch((err) => console.log('Request failed', err));
			});
		});
	};

	const serialize = (value) => {
		return (
			value
				// Return the string content of each paragraph in the value's children.
				.map((n) => Node.string(n))
				// Join them all with line breaks denoting paragraphs.
				.join('\n')
		);
	};

	return (
		<div>
			<CustomDiv>
				<TextEditor value={textValue} setValue={setTextValue} />
				<ButtonDiv>
					<SubmitButton onClick={storeValue}>Submit</SubmitButton>
					<CancelButton>Cancel</CancelButton>
				</ButtonDiv>
			</CustomDiv>
		</div>
	);
}

const initialValue = [
	{
		type: 'paragraph',
		children: [
			{ text: 'This is editable ' },
			{ text: 'rich', bold: true },
			{ text: ' text, ' },
			{ text: 'much', italic: true },
			{ text: ' better than a ' },
			{ text: '<textarea>', code: true },
			{ text: '!' },
		],
	},
	{
		type: 'paragraph',
		children: [
			{
				text: "Since it's rich text, you can do things like turn a selection of text ",
			},
			{ text: 'bold', bold: true },
			{
				text: ', or add a semantically rendered block quote in the middle of the page, like this:',
			},
		],
	},
	{
		type: 'block-quote',
		children: [{ text: 'A wise quote.' }],
	},
	{
		type: 'paragraph',
		children: [{ text: 'Try it out for yourself!' }],
	},
];

export default ReplyBox;
