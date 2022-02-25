import React, { useState } from 'react';
import { Button } from '@/ui';
import { Form, Formik } from 'formik';
import styles from './index.module.css';
import GeneralForm from '@/components/GeneralForm';

// TODO: this data should come from API response and should move to db.json
const formData = {
  data: [
    {
      step: 1,
      section: 'contact',
      fields: [
        {
          type: 'text',
          isRequired: true,
          label: 'Full name',
          name: 'fullName',
          errorMessage: 'Please enter a valid name',
          regexPattern: "^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$",
        },
        {
          type: 'text',
          isRequired: false,
          label: 'Role',
          name: 'role',
        },
        {
          type: 'tel',
          isRequired: true,
          label: 'Phone number',
          name: 'tel',
          errorMessage: 'Please enter a valid phone number',
          // regexPattern: '^[0-9]+$',
        },
      ],
      title: 'Who is the primary contact for this policy',
      description:
        "This person will receive all communication from NewFront about this policy. You can change this contact information later. If you're not sure, just add your contact information.",
    },
    {
      step: 2,
      section: 'company',
      fields: [
        {
          type: 'text',
          isRequired: true,
          regexPattern: '',
          label: 'Company name',
          name: 'company',
        },
        {
          type: 'text',
          isRequired: true,
          regexPattern: '',
          label: 'What is your Federal Enployer Identification Number?(FEIN)',
          name: 'idNumber',
        },
        {
          type: 'number',
          isRequired: true,
          regexPattern: '',
          label: 'Years in business',
          name: 'years',
        },
        {
          type: 'number',
          isRequired: true,
          regexPattern: '',
          label: 'Number of locations',
          name: 'locations',
        },
        {
          type: 'text',
          isRequired: false,
          regexPattern: '',
          label: 'In which states do you operate?',
          name: 'states',
        },
      ],
      title: 'Tell us about your company',
      description: '',
    },
  ],
};

export default function IndexPage(): JSX.Element {
  const [currentStep, setcurrentStep] = useState(1);
  const errors = {};

  const lastStep = formData?.data?.length;

  // set initialValues to the muti-step form
  let initialValues = {};
  formData.data?.forEach((element) => element?.fields?.forEach((field) => (initialValues[field?.name] = '')));

  // TODO: should not push to next screen if user haven't completde all required fields
  const nextPage = () => {
    console.log(errors);
    // if (errors) {
    setcurrentStep(currentStep + 1);
    // }
  };

  const previousPage = () => {
    if (currentStep > 0) {
      setcurrentStep(currentStep - 1);
    }
  };

  // add form validation here
  const validate = (values) => {
    for (let i = 0; i < formData.data.length; i++) {
      formData.data[i].fields.forEach((field) => {
        if (field.isRequired) {
          if (!values[field.name]) {
            errors[field.name] = field?.errorMessage;
          } else if (field?.regexPattern && !new RegExp(field?.regexPattern).test(values[field.name].toLowerCase())) {
            errors[field.name] = field?.errorMessage;
          }
        }
      });
    }

    return errors;
  };

  return (
    <div className={styles.insuranceForm}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          alert(JSON.stringify(values, null, 2));
        }}
        validate={validate}
      >
        <Form className={styles.form}>
          {formData?.data?.map((formFields) => (
            <GeneralForm
              displayedData={formFields}
              className={`${formFields.step === currentStep ? 'display' : 'hidden'}`}
            />
          ))}
          <div className={styles.controlPanel}>
            {/* show next button */}
            {currentStep > 1 && <Button children={'Previous'} size="primary" type="button" onClick={previousPage} />}
            {/* show previous button */}
            {currentStep !== lastStep && <Button children={'Next'} size="primary" type="button" onClick={nextPage} />}
            {/* show complete button */}
            {currentStep === lastStep && <Button children={'complete'} size="primary" type="submit" />}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
