import './App.css'
import FormUser from './components/form/FormUser'
// import SignedFormUser from './components/form/SignedFormUser'
import { Container, Row } from 'reactstrap'

function App() {
	return (
		<div className='App'>
			<Container>
				<Row>
					<FormUser />
					{/* <SignedFormUser /> */}
				</Row>
			</Container>
		</div>
	)
}

export default App
