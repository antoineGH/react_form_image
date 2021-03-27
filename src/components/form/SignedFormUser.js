import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Card, CardBody, FormGroup, FormText, Form, Input, InputGroup, Col, Label } from 'reactstrap'

//INFO: FUNCTION FORM USER
export default function SignedFormUser() {
	// useState Hooks
	const [imageLoaded, setImageLoaded] = useState(false)
	const [imageDesc, setImageDesc] = useState('')
	const [imageTitle, setImageTitle] = useState('')
	const [profilePicture, setProfilePicture] = useState({
		name: '',
		size: '',
		type: '',
	})
	const [imageURL, setImageURL] = useState('')

	// Validation schema with Yup
	const regexNoSpecial = /^[a-zA-Z. ]*$/
	const supported_format = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
	const validationSchema = Yup.object({
		profile_picture: Yup.mixed()
			.test('fileSize', 'File is too large', (value) => !value || value.size <= 2500000)
			.test('fileType', 'Format is wrong', (value) => !value || supported_format.includes(value.type)),
		image_title: Yup.string().min(2, 'Too short').max(20, 'Too long').matches(regexNoSpecial, 'No numbers or special characters').required('Required'),
		image_desc: Yup.string().min(2, 'Too short').max(50, 'Too long').matches(regexNoSpecial, 'No numbers or special characters').required('Required'),
	})

	// Handle Form with Formik
	const { handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors } = useFormik({
		initialValues: {
			file: '',
			image_title: '',
			image_desc: '',
		},
		validationSchema,
		onSubmit(values) {
			setImageTitle(values.image_title)
			setImageDesc(values.image_desc)
			setProfilePicture({
				name: values.profile_picture.name,
				size: values.profile_picture.size,
				type: values.profile_picture.type,
			})
			setImageLoaded(true)
			uploadPicture(values)
		},
	})

	function uploadPicture(values) {
		uploadUnsignedCloudinary(values)
			.then((response) => {
				console.log(response)
				setImageURL(response.url)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	async function uploadUnsignedCloudinary(values) {
		const cloudName = 'dgr9lcyrm'
		const uploadPreset = 'cg4aqc9y'
		const api_key = '142917926898631'
		const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
		const ts = ''
		const sig = ''

		let data = new FormData()
		data.append('file', values.profile_picture)
		data.append('upload_preset', uploadPreset)
		data.append('api_key', api_key)
		data.append('timestamp', ts)
		data.append('signature', sig)

		const response = await fetch(url, {
			method: 'POST',
			body: data,
		})
		const responseJson = await response.json()

		return new Promise((resolve, reject) => {
			responseJson ? resolve(responseJson) : reject()
		})
	}

	return (
		<>
			<Col lg='6'>
				<Card className='mt-4'>
					<CardBody className='px-lg-5 py-lg-5'>
						<div className='text-center text-muted mb-4'>
							<h2>Form Image</h2>
						</div>
						<Form onSubmit={handleSubmit}>
							{/* image_title */}
							<FormGroup className='mb-3'>
								<Label className='label_form'>Image title</Label>
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
								{errors.image_title && touched.image_title && <div className='error_field'>{errors.image_title}</div>}
							</FormGroup>

							{/* image_desc */}
							<FormGroup className='mb-3'>
								<Label className='label_form'>Image description</Label>
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
								{errors.image_desc && touched.image_desc && <div className='error_field'>{errors.image_desc}</div>}
							</FormGroup>

							{/* upload picture */}
							<FormGroup>
								<Label for='exampleFile'>Profile picture</Label>
								<Input
									type='file'
									name='profile_picture'
									id='profile_picture'
									onBlur={handleBlur}
									onChange={(event) => {
										setFieldValue('profile_picture', event.currentTarget.files[0])
									}}
								/>
								<FormText color='muted'>Supported format .png .jpg .jpeg (maximum size: 1Mo).</FormText>
								{errors.profile_picture && touched.profile_picture && <div className='error_field'>{errors.profile_picture}</div>}
							</FormGroup>

							{/* submit form */}
							<Button className='my-4' color='primary' type='submit'>
								Send
							</Button>
						</Form>
					</CardBody>
					{imageLoaded && (
						<CardBody>
							Image Title: {imageTitle}
							<br />
							Image Desc: {imageDesc}
							<br />
							Profile Picture: {profilePicture.name}
							<br />
							Size: {profilePicture.size}Ko
							<br />
							Type: {profilePicture.type}
						</CardBody>
					)}
				</Card>
			</Col>
		</>
	)
}
