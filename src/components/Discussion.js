import { useState } from 'react';
import Question from './Question';
import { QuestionContext } from './QuestionContext';
import { useEffect } from 'react';
import AskQuestionButton from './AskQuestionButton';
import styled from 'styled-components';
import ReplyBox from './ReplyBox';
import TitleInput from './TitleInput';

const CustomDiv = styled.div`
	margin: 10px;
	margin-top: 0px;
	margin-left: 0px;
`;

const Discussion = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const url = 'http://localhost:8080/questions/60efb101458fe615aaa2786b';

	// const url = 'http://localhost:8080/questions/60effd184aec8d4c777abb53';
	// const url = 'http://localhost:8080/questions/author/60eec4b4ca5eb79cc28d3e94';



	useEffect(() => {
		fetch(url)
			.then(function (response) {
				if (response.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' +
						response.status
					);
					return;
				}

				// Examine the text in the response
				response.json().then(function (data) {
					setIsLoaded(true);
					setQuestion(data);
				});
			})
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	}, []);

	const [question, setQuestion] = useState({
		author: {
			_id: '',
			email: '',
			verified_email: true,
			name: '',
			given_name: '',
			family_name: '',
			picture:
				'',
			locale: '',
			googleId: '',
		},
		userName: 'Ansh',
		votes: 24,
		timestamp: '15:21',
		dateUploaded: '3 months ago',
		userImageUrl: 'https://material-ui.com/static/images/avatar/2.jpg',
		totalReplies: 5,
		title: 'Why is the squareroot of pi an odd number?',
		content:
			"[{\"type\":\"paragraph\",\"children\":[{\"text\":\"I'm trying to find a way to  \"},{\"text\":\"verify if, a user has logged in or not\",\"underline\":true},{\"text\":\" and then return their account data. What's the  \"},{\"text\":\"easiest\",\"italic\":true},{\"text\":\"  and  \"},{\"text\":\"safest\",\"bold\":true},{\"text\":\"  way to use authentication?\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"so far I believe I can follow the following steps: \"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]},{\"type\":\"bulleted - list\",\"children\":[{\"type\":\"list - item\",\"children\":[{\"text\":\"Request an access token from Google using OAuth2\"}]},{\"type\":\"list - item\",\"children\":[{\"text\":\"Pass the token to Passport JS to authenticate\"}]},{\"type\":\"list - item\",\"children\":[{\"text\":\"If a user does not exist in the DB, register them.Else, return their user profile\",\"code\":true}]}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]",

		replies: [
			{
				id: 1,
				parent_id: null,
				userName: 'exbus67',
				timestamp: '47:21',
				dateUploaded: '1 year ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				content: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
			{
				id: 2,
				parent_id: 1,
				userName: 'Random',
				timestamp: '6:21',
				dateUploaded: '1 month ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				content: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
			{
				id: 3,
				parent_id: 1,
				userName: 'Random',
				timestamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				content: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
			{
				id: 4,
				parent_id: 2,
				userName: 'Random',
				timestamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				content: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
			{
				id: 5,
				parent_id: null,
				userName: 'Random name 4',
				timestamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				content: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
		],
	});

	const [askButtonState, setAskButtonState] = useState(false)

	const [title, setTitle] = useState("")

	return (
		<QuestionContext.Provider value={{ question, setQuestion }}>
			{question != null &&
				<AskQuestionButton askButtonOpen={askButtonState} setAskButtonOpen={setAskButtonState} />}
			{askButtonState &&
				<CustomDiv>
					<TitleInput title={title} setTitle={setTitle} />
					<ReplyBox />
				</CustomDiv>
			}
			{question != null && <Question />}
		</QuestionContext.Provider>
	);
};


export default Discussion;
