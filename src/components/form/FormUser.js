import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
	Button,
	Card,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Col,
	Row,
	Container,
	Label,
} from 'reactstrap'

//INFO: FUNCTION FORM USER
export default function FormUser() {
	// Validation schema with Yup
	const regexNoSpecial = /^[a-zA-Z. ]*$/
	const validationSchema = Yup.object({
		image_title: Yup.string()
			.min(2, 'Title too short')
			.max(20, 'Title too long')
			.matches(regexNoSpecial, "Title doesn't contain numbers or special characters")
			.required('Required'),
		image_desc: Yup.string()
			.min(2, 'Description too short')
			.max(50, 'Description too long')
			.matches(regexNoSpecial, "Description doesn't contain numbers or special characters")
			.required('Required'),
	})

	// Handle Form with Formik
	const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
		initialValues: {
			image_title: '',
			image_desc: '',
		},
		validationSchema,
		onSubmit(values) {
			console.log(values)
		},
	})

	return (
		<>
			<Container>
				<Row className='justify-content-center'>
					<Col lg='6'>
						<Card className='mt-4'>
							<CardBody className='px-lg-5 py-lg-5'>
								<div className='text-center text-muted mb-4'>
									<h2>Form Image</h2>
								</div>
								<Form onSubmit={handleSubmit}>
									{/* image_title */}
									<FormGroup className='mb-3'>
										<Label>Image title</Label>
										<InputGroup className='input-group-alternative'>
											<Input
												id='image_title'
												name='image_title'
												type='text'
												placeholder='Image title'
												onBlur={handleBlur}
												value={values.username}
												onChange={handleChange}
											/>
										</InputGroup>
										{errors.image_title && touched.image_title && (
											<div className='error_field'>{errors.image_title}</div>
										)}
									</FormGroup>

									{/* image_desc */}
									<FormGroup className='mb-3'>
										<Label>Image description</Label>
										<InputGroup className='input-group-alternative'>
											<Input
												id='image_desc'
												name='image_desc'
												type='text'
												placeholder='Image description'
												onBlur={handleBlur}
												value={values.username}
												onChange={handleChange}
											/>
										</InputGroup>
										{errors.image_desc && touched.image_desc && (
											<div className='error_field'>{errors.image_desc}</div>
										)}
									</FormGroup>

									{/* submit form */}
									<Button className='my-4' color='primary' type='submit'>
										Send
									</Button>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}
