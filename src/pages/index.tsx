import { HiPlus } from 'react-icons/hi';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useState, useEffect } from 'react';
import Button from '@/components/buttons/Button';
import InputModal from '@/components/InputModal';
import { MdModeEditOutline } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

type Student = {
  id: String;
  firstName: String;
  lastName: String;
  dateOfBirth: String;
};

type FormMode = 'create' | 'edit';

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formMode, setFormMode] = useState<FormMode>('create');

  const [defaultValue, setDefaultValue] = useState<Student | null>(null);

  const router = useRouter();

  const getStudents = async () => {
    const response = await fetch('http://localhost:8080/student', {
      method: 'GET',
    });
    const data = await response.json();
    setStudents(data.students);
  };

  useEffect(() => {
    getStudents();
  }, [students]);

  const onCreateHandler = async (e) => {
    e.preventDefault();

    const id = e.target.id.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    setIsLoading(true);
    const response = await fetch('http://localhost:8080/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, firstName, lastName, dateOfBirth }),
    });
    setIsLoading(false);
    setIsOpen(false);
    const data = await response.json();
  };

  const onEditHandler = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:8080/student/${e.target.id.value}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, firstName, lastName, dateOfBirth }),
      }
    );
    setIsLoading(false);
    setIsOpen(false);
    const data = await response.json();
  };

  const onDeleteHandler = async (targetId: String) => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:8080/student/${targetId}`, {
      method: 'DELETE',
    });
    setIsLoading(false);

    const data = await response.json();
  };

  const dateToAge = (date: String) => {
    const dob = new Date(date);
    //calculate month difference from current date in time
    const month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    const age_dt = new Date(month_diff);

    //extract year from date
    const year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    const age = Math.abs(year - 1970);

    return age;
  };

  return (
    <Layout>
      <InputModal
        title={`${formMode === 'create' ? 'Create' : 'Edit'} Student`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={formMode === 'create' ? onCreateHandler : onEditHandler}
        isLoading={isLoading}
        defaultValue={defaultValue}
      />
      <Seo />
      <div className='px-40'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='text-gray w-full text-left text-sm'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  <div className='flex items-center'>ID</div>
                </th>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  <div className='flex items-center'>Age</div>
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Edit</span>
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student, idx) => (
                <tr
                  key={idx}
                  className='cursor-pointer border-b bg-white'
                  onClick={() => {
                    router.push(`/${student.id}`);
                  }}
                >
                  <td className='px-6 py-4'>{student.id}</td>
                  <th
                    scope='row'
                    className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 '
                  >
                    {student.firstName} {student.lastName}
                  </th>
                  <td className='px-6 py-4'>
                    {dateToAge(student.dateOfBirth)}
                  </td>
                  <td
                    className='px-6 py-4 text-right'
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormMode('edit');
                      setIsOpen(true);
                      setDefaultValue({
                        id: student.id,
                        firstName: student.firstName,
                        lastName: student.lastName,
                        dateOfBirth: student.dateOfBirth,
                      });
                    }}
                  >
                    <MdModeEditOutline color='blue' />
                  </td>
                  <td
                    className='px-6 py-4 text-right'
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteHandler(student.id);
                    }}
                  >
                    <IoMdTrash color='red' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          className='mt-5'
          variant='dark'
          rightIcon={HiPlus}
          onClick={() => {
            setFormMode('create');
            setIsOpen(true);
            setDefaultValue(null);
          }}
        >
          Add New Student
        </Button>
      </div>
    </Layout>
  );
}
