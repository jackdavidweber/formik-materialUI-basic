import * as React from 'react';
import {render} from 'react-dom';
import {Formik, Field, Form} from 'formik';
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
} from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch,
} from 'formik-material-ui';

interface Values {
  email: string;
}

const ranges = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

const UppercasingTextField = (props: TextFieldProps) => (
  <MuiTextField
    {...fieldToTextField(props)}
    onChange={event => {
      const {value} = event.target;
      props.form.setFieldValue(
        props.field.name,
        value ? value.toUpperCase() : ''
      );
    }}
  />
);

const App = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      select: 'none',
      tags: [],
      rememberMe: true,
    }}
    validate={values => {
      const errors: Partial<Values> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={(values, {setSubmitting}) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
    render={({submitForm, isSubmitting, values, setFieldValue}) => (
      <Form>
        <Field
          name="email"
          type="email"
          label="Email"
          component={UppercasingTextField}
        />
        <br />
        <Field
          type="password"
          label="Password"
          name="password"
          component={TextField}
        />
        <br />
        <FormControlLabel
          control={
            <Field label="Remember Me" name="rememberMe" component={Switch} />
          }
          label="Remember Me"
        />
        <br />
        <Field
          type="text"
          name="select"
          label="With Select"
          select
          helperText="Please select Range"
          margin="normal"
          component={TextField}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field>
        <br />
        <FormControl>
          <InputLabel shrink={true} htmlFor="tags">
            Tags
          </InputLabel>
          <Field
            type="text"
            name="tags"
            component={Select}
            multiple={true}
            inputProps={{name: 'tags', id: 'tags'}}
          >
            <MenuItem value="dogs">Dogs</MenuItem>
            <MenuItem value="cats">Cats</MenuItem>
            <MenuItem value="rats">Rats</MenuItem>
            <MenuItem value="snakes">Snakes</MenuItem>
          </Field>
        </FormControl>
        <br />
        {isSubmitting && <LinearProgress />}
        <br />
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          onClick={submitForm}
        >
          Submit
        </Button>
      </Form>
    )}
  />
);

render(<App />, document.getElementById('root'));
