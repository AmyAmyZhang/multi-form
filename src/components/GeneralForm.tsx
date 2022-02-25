import React from 'react';
import styles from './GeneralForm.module.css';
import { useFormikContext } from 'formik';

type formField = {
  type: string;
  name: string;
  label: string;
  isRequired?: boolean;
};

type formData = {
  title: string;
  description?: string;
  fields: formField[];
};
interface Props {
  children?: React.ReactNode;
  testId?: string;
  displayedData?: formData;
  className?: string;
}

function GeneralForm({ displayedData, className }: Props): JSX.Element {
  const { handleChange, handleBlur, errors } = useFormikContext();
  return (
    <div className={styles[className]}>
      <h1>{displayedData?.title}</h1>
      <p>{displayedData?.description}</p>
      {displayedData?.fields.map((element, index) => {
        if (element.type === 'text' || element.type === 'tel' || element.type === 'number') {
          return (
            <div className={styles.formWrapper} key={index}>
              <label htmlFor={element.name}>{element.label}</label>
              <input
                type={element.type}
                disabled={false}
                name={element.name}
                // value={formik.values?.[element.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                required={element?.isRequired}
                className={styles.formInput}
              />
              {errors[element.name] ? <div className={styles.errorContainer}>{errors[element.name]}</div> : null}
            </div>
          );
        }
      })}
    </div>
  );
}

export default GeneralForm;
