import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useData } from "./DataProvider";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

type JobDetailsFormProps = {
  setTabIndex: (index: number) => void | number;
};

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ setTabIndex }) => {
  const dataContext = useData();
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {},
    });

  useEffect(() => {
    if (dataContext) {
      dataContext.setState((prevState: typeof dataContext.state) => ({
        ...prevState,
        jobDetails: values,
      }));
    }
    console.log("formik values", values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
  const handleNext = () => {
    setTabIndex(2);
  };
  const handlePrevious = () => {
    setTabIndex(0);
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={handlePrevious}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" onClick={handleNext}>
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
