import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TaskFormValues } from '../components/TaskTypes';

interface TaskFormProps {
  onSubmit: (values: TaskFormValues) => void;
}

const TaskFormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  dueDate: Yup.date().required('Due date is required'),
});

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const initialValues: TaskFormValues = {
    title: '',
    description: '',
    dueDate: '',
    _id: undefined
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Formik
        initialValues={initialValues}
        validationSchema={TaskFormSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="p-6 bg-white shadow-md rounded-lg w-full md:w-96">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="mt-1 p-2 w-full border rounded-lg"
              />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="mt-1 p-2 w-full border rounded-lg"
              />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <Field
                type="date"
                id="dueDate"
                name="dueDate"
                className="mt-1 p-2 w-full border rounded-lg"
              />
              <ErrorMessage name="dueDate" component="div" className="text-red-500" />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
