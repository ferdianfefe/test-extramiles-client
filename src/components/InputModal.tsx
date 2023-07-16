import Button from '@/components/buttons/Button';
import { useEffect, useState } from 'react';

type InputModalProps = {
  title: string;
  onSubmit: Function;
  isOpen: boolean;
  setIsOpen: Function;
  isLoading: boolean;
  defaultValue: Student | null;
};

type Student = {
  id: string | number | readonly string[] | undefined | null;
  firstName: string | number | readonly string[] | undefined | null;
  lastName: string | number | readonly string[] | undefined | null;
  dateOfBirth: string | number | readonly string[] | undefined | null;
};

const InputModal = ({
  title,
  onSubmit,
  isOpen = true,
  setIsOpen,
  isLoading = false,
  defaultValue = null,
}: InputModalProps) => {
  const [defaultId, setDefaultId] = useState<
    string | number | readonly string[] | undefined | null
  >(null);
  const [defaultFirstName, setDefaultFirstName] = useState<
    string | number | readonly string[] | undefined | null
  >(null);
  const [defaultLastName, setDefaultLastName] = useState<
    string | number | readonly string[] | undefined | null
  >(null);
  const [defaultDateOfBirth, setDefaultDateOfBirth] = useState<
    string | number | readonly string[] | undefined | null
  >('');

  useEffect(() => {
    setDefaultId(defaultValue?.id);
    setDefaultFirstName(defaultValue?.firstName);
    setDefaultLastName(defaultValue?.lastName);
    setDefaultDateOfBirth(defaultValue?.dateOfBirth);
  }, [defaultValue]);

  return (
    <div
      className={`fixed inset-0 z-[51] overflow-y-auto ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className='flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          aria-hidden='true'
          onClick={() => setIsOpen(false)}
        ></div>

        <span
          className='hidden sm:inline-block sm:h-screen sm:align-middle'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className={` inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle`}
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <form onSubmit={onSubmit}>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <h3
                    className='text-lg font-medium leading-6 text-gray-900'
                    id='modal-headline'
                  >
                    {title}
                  </h3>
                  <div className='mt-5 w-full max-w-lg'>
                    <div className='-mx-3 mb-6 flex flex-wrap'>
                      <div className='w-full px-3'>
                        <label
                          className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
                          htmlFor='grid-password'
                        >
                          ID
                        </label>
                        <input
                          className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                          id='grid-password'
                          type='text'
                          name='id'
                          placeholder='123456'
                          disabled={defaultValue !== null}
                          required
                          value={defaultId}
                          onChange={(e) => {
                            setDefaultId(e.target.value);
                          }}
                        />
                        <p className='text-xs italic text-gray-600'>
                          Enter ID of 6 digits
                        </p>
                      </div>
                    </div>

                    <div className='-mx-3 mb-6 flex flex-wrap'>
                      <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
                        <label
                          className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
                          htmlFor='grid-first-name'
                        >
                          First Name
                        </label>
                        <input
                          className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                          id='grid-first-name'
                          type='text'
                          placeholder='Jane'
                          name='firstName'
                          value={defaultFirstName}
                          required
                          onChange={(e) => {
                            setDefaultFirstName(e.target.value);
                          }}
                        />
                        {/* <p className='text-xs italic text-red-500'>
                          Please fill out this field.
                        </p> */}
                      </div>
                      <div className='w-full px-3 md:w-1/2'>
                        <label
                          className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
                          htmlFor='grid-last-name'
                        >
                          Last Name
                        </label>
                        <input
                          className='block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                          id='grid-last-name'
                          type='text'
                          placeholder='Doe'
                          name='lastName'
                          value={defaultLastName}
                          onChange={(e) => {
                            setDefaultLastName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className='-mx-3 mb-6 flex flex-wrap'>
                      <div className='w-full px-3'>
                        <label
                          className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
                          htmlFor='grid-password'
                        >
                          Date of Birth
                        </label>
                        {defaultValue !== null ? (
                          <input
                            className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                            type='date'
                            name='dateOfBirth'
                            required
                            value={defaultDateOfBirth as string}
                            onChange={(e) => {
                              setDefaultDateOfBirth(e.target.value);
                            }}
                          />
                        ) : (
                          <input
                            className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                            type='date'
                            name='dateOfBirth'
                            required
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <Button isLoading={isLoading} variant='dark' type='submit'>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
