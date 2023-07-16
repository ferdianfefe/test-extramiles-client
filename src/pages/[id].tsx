import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/buttons/Button';
import { HiArrowLeft } from 'react-icons/hi';
import Link from 'next/link';

type Student = {
  id: String;
  firstName: String;
  lastName: String;
  dateOfBirth: String;
};

const ViewStudent = () => {
  const { id } = useRouter().query as { id: string };
  const [student, setStudent] = useState<Student | null>(null);

  const getStudent = async () => {
    const response = await fetch(`http://localhost:8080/student/${id}`, {
      method: 'GET',
    });
    const data = await response.json();
    setStudent(data);
  };

  useEffect(() => {
    getStudent();
  }, [id, student]);

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
              </tr>
            </thead>
            <tbody>
              {student && (
                <tr className='border-b bg-white '>
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
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Link href='/'>
          <Button variant='dark' leftIcon={HiArrowLeft} className='mt-10'>
            Back
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default ViewStudent;
