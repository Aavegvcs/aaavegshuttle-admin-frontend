import React, { useState } from 'react';
import { TextField, Button, FormControl } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
export const AddVendor = () => {
  const [vendorForm, setVendorForm] = useState({
    name: '',
    phno: '',
    email: '',
    photo: '',

    currAddress: '',
    currAddressProof: '',
    prmtAddress: '',
    prmtAddressProof: '',

    bankName: '',
    bankDetails: '',
    holderName: '',
    IFSC: '',
    accountN0: '',

    aadharNO: '',
    aadharFront: '',
    aadharBack: '',

    pancard: '',
    panNO: '',

    GST_NO: '',
    GST_IMG: '',

    police_verification: '',
    venderAggrement: ''
  });

  const [nameErr, setNameErr] = useState(false);
  const [phnoErr, setPhnoErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  // const [addressErr, setAddressErr] = useState(false);
  const [holderNameErr, setHolderNameErr] = useState(false);
  const [ifscErr, setIFSCErr] = useState(false);
  const [accountNoErr, setAccountNoErr] = useState(false);
  const [aadharFrontErr, setaAdharFrontErr] = useState(false);
  const [aadharBackErr, setaAdharBackErr] = useState(false);
  const [pancardErr, setPancardErr] = useState(false);

  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    // console.log(event, field);
    //   setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setVendorForm({ ...vendorForm, [name]: link });
    //   setisLoading(false);
  };
  // const imageUploadApi = async (value) => {
  //   let result = await axios.request(value);
  //   console.log(result.data.name);
  //   let imageName = result.data.name;
  //   return imageName;
  // };
  // console.log(vendorForm);
  const UploadDocumenttos3Bucket = async (e) => {
    console.log(e.target.files[0]);
    // const reader = new FormData();
    // reader.append('file', e.target.files[0]);
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: `apiposttos3bucket`,
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   data: reader
    // };
    // let imageName = await imageUploadApi(config);
    // let totalUrl = `apitogets3bucket` + imageName;
    // console.log(totalUrl);
    // setTitleImage(totalUrl);
    // return totalUrl;
    return 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  };
  const handleAddVendor = () => {
    if (
      vendorForm.name != '' &&
      validateEmail(vendorForm.email) &&
      vendorForm.IFSC != '' &&
      vendorForm.accountN0 != '' &&
      vendorForm.pancard != '' &&
      vendorForm.phno?.length == 10 &&
      vendorForm.aadharFront != '' &&
      vendorForm.aadharBack != '' &&
      vendorForm.holderName != '' &&
      vendorForm.address != ''
    ) {
      const document = {
        aadharFront: vendorForm.aadharFront,
        aadharBack: vendorForm.aadharBack,
        pancard: vendorForm.pancard
      };
      if (vendorForm.voterId != '') {
        document.voterId = vendorForm.voterId;
      }

      const body = {
        vendorName: vendorForm.name,
        vendorEmail: vendorForm.email,
        vendorMobile: vendorForm.phno,
        vendorAddress: vendorForm.address,
        vendorDocuments: document,
        ifsc: vendorForm.IFSC,
        holderName: vendorForm.holderName,
        accountNumber: vendorForm.accountN0
      };
      // console.log(body);
      axios
        .post('http://192.168.1.230.:3000/app/v1/vendor/insertVendor', body, { headers: {} })
        .then((res) => {
          console.log(res);
          toast.success(`${res.data.result}`);
        })
        .catch((err) => {
          console.log('Api error ', err);
          toast.error('Error');
        });
      setNameErr(false);
      setEmailErr(false);
      setIFSCErr(false);
      setAccountNoErr(false);
      setPancardErr(false);
      setPhnoErr(false);
      setaAdharFrontErr(false);
      setaAdharBackErr(false);
      setHolderNameErr(false);
      // setAddressErr(false);
    } else {
      vendorForm.name == '' ? setNameErr(true) : setNameErr(false);
      validateEmail(vendorForm.email) ? setEmailErr(false) : setEmailErr(true);
      vendorForm.IFSC == '' ? setIFSCErr(true) : setIFSCErr(false);
      vendorForm.accountN0 == '' ? setAccountNoErr(true) : setAccountNoErr(false);
      vendorForm.pancard == '' ? setPancardErr(true) : setPancardErr(false);
      vendorForm.phno.length != 10 ? setPhnoErr(true) : setPhnoErr(false);
      vendorForm.aadharFront == '' ? setaAdharFrontErr(true) : setaAdharFrontErr(false);
      vendorForm.aadharBack == '' ? setaAdharBackErr(true) : setaAdharBackErr(false);
      vendorForm.holderName == '' ? setHolderNameErr(true) : setHolderNameErr(false);
      // vendorForm.address == '' ? setAddressErr(true) : setAddressErr(false);
    }
  };
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col gap-10 bg-white p-4 rounded-xl">
        {/* heading */}
        <div>
          <p className="text-3xl text-gray-600 text-center">Vendor Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        <div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:gap-7 gap-10">
            <div>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Name"
                  variant="outlined"
                  value={vendorForm.name}
                  onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                />
              </FormControl>
              {nameErr && <p className="text-red-500 text-xs ml-2">name error</p>}
            </div>
            <div>
              <FormControl fullWidth>
                <TextField
                  type="tel"
                  id="outlined-basic"
                  label="Mobile Number"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  variant="outlined"
                  pattern="[0-9]{10}"
                  value={vendorForm.phno}
                  onChange={(e) => setVendorForm({ ...vendorForm, phno: e.target.value })}
                />
              </FormControl>
              {phnoErr && <p className="text-red-500 text-xs ml-2">phone number error</p>}
            </div>
            <div>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={vendorForm.email}
                  onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                />
              </FormControl>
              {emailErr && <p className="text-red-500 text-xs ml-2">email error</p>}
            </div>

            <div>
              {vendorForm.photo == '' ? (
                <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                  <label htmlFor="photo" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                    Upload current Address{' '}
                  </label>{' '}
                  <input type="file" id="photo" name="photo" onChange={(e) => handleDocumentPhoto(e)} className="text-xs w-24" />
                </p>
              ) : (
                <div className="flex justify-between">
                  <img src={vendorForm.photo} alt="photo" className="w-20 h-20 rounded-xl" />
                  <Button onClick={() => setVendorForm({ ...vendorForm, photo: '' })} variant="outlined" color="error">
                    remove
                  </Button>
                </div>
              )}
              <p className="text-red-500 text-xs ml-2">upload photo</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xl text-gray-500">Address details</p>
              <p className=" border border-gray-300 mt-1"></p>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex gap-10 items-center w-full">
                <div className="w-full ">
                  <FormControl fullWidth>
                    <TextField
                      type="text"
                      id="outlined-basic"
                      label="Current Address"
                      variant="outlined"
                      value={vendorForm.currAddress}
                      onChange={(e) => setVendorForm({ ...vendorForm, currAddress: e.target.value })}
                    />
                  </FormControl>
                  <p className="text-red-500 text-xs ml-2">currAddress error</p>
                </div>
                <div className="w-full ">
                  {vendorForm.currAddress == '' ? (
                    <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                      <label htmlFor="currAddress" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                        Upload current Address{' '}
                      </label>{' '}
                      <input
                        type="file"
                        id="currAddress"
                        name="currAddressProof"
                        onChange={(e) => handleDocumentPhoto(e)}
                        className="text-xs w-24"
                      />
                    </p>
                  ) : (
                    <div className="flex justify-between">
                      {' '}
                      <img src={vendorForm.currAddress} alt="currAddress" className="w-20 h-20 rounded-xl" />
                      <Button onClick={() => setVendorForm({ ...vendorForm, currAddress: '' })} variant="outlined" color="error">
                        remove
                      </Button>
                    </div>
                  )}
                  <p className="text-red-500 text-xs ml-2">upload Curr Address </p>
                </div>
              </div>
              <div className="flex gap-10 items-center w-full">
                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      type="text"
                      id="outlined-basic"
                      label="Parmanent Address"
                      variant="outlined"
                      value={vendorForm.prmtAddress}
                      onChange={(e) => setVendorForm({ ...vendorForm, prmtAddress: e.target.value })}
                    />
                  </FormControl>
                  <p className="text-red-500  ml-2">currAddress error</p>
                </div>
                <div className="w-full ">
                  {vendorForm.aadharFront == '' ? (
                    <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                      <label htmlFor="currAddress" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                        Upload permanent Address{' '}
                      </label>{' '}
                      <input
                        type="file"
                        id="prmtAddress"
                        name="prmtAddressProof"
                        onChange={(e) => handleDocumentPhoto(e)}
                        className="text-xs w-24"
                      />
                    </p>
                  ) : (
                    <div className="flex justify-between">
                      {' '}
                      <img src={vendorForm.aadharFront} alt="aadharFront" className="w-20 h-20 rounded-xl" />
                      <Button onClick={() => setVendorForm({ ...vendorForm, aadharFront: '' })} variant="outlined" color="error">
                        remove
                      </Button>
                    </div>
                  )}
                  <p className="text-red-500 text-xs ml-2">upload parmanent Address </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xl text-gray-500">Bank details</p>
              <p className=" border border-gray-300 mt-1"></p>
            </div>
            <div>
              <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:gap-7 gap-10">
                <div>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      type="text"
                      label="Account Holder Name"
                      variant="outlined"
                      value={vendorForm.holderName}
                      onChange={(e) => setVendorForm({ ...vendorForm, holderName: e.target.value })}
                    />
                  </FormControl>
                  {holderNameErr && <p className="text-red-500 text-xs ml-2">bank name error</p>}
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Account Number"
                      variant="outlined"
                      type="number"
                      value={vendorForm.accountN0}
                      onChange={(e) => setVendorForm({ ...vendorForm, accountN0: e.target.value })}
                    />
                  </FormControl>
                  {accountNoErr && <p className="text-red-500 text-xs ml-2">account number error</p>}
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Bank Name"
                      variant="outlined"
                      type="number"
                      value={vendorForm.bankName}
                      onChange={(e) => setVendorForm({ ...vendorForm, bankName: e.target.value })}
                    />
                  </FormControl>
                  {accountNoErr && <p className="text-red-500 text-xs ml-2">Bank Name error</p>}
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      type="text"
                      id="outlined-basic"
                      label="IFSC Code"
                      variant="outlined"
                      value={vendorForm.IFSC}
                      onChange={(e) => setVendorForm({ ...vendorForm, IFSC: e.target.value })}
                    />
                  </FormControl>
                  {ifscErr && <p className="text-red-500 text-xs ml-2">IFSC code error</p>}
                </div>

                <div>
                  {vendorForm.bankDetails == '' ? (
                    <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                      <label htmlFor="bankDetails" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                        Upload Bank passbook{' '}
                      </label>{' '}
                      <input
                        type="file"
                        id="bankDetails"
                        name="bankDetails"
                        onChange={(e) => handleDocumentPhoto(e)}
                        className="text-xs w-24"
                      />
                    </p>
                  ) : (
                    <div className="flex justify-between">
                      {' '}
                      <img src={vendorForm.bankDetails} alt="bankDetails" className="w-20 h-20 rounded-xl" />
                      <Button onClick={() => setVendorForm({ ...vendorForm, bankDetails: '' })} variant="outlined" color="error">
                        remove
                      </Button>
                    </div>
                  )}
                  <p className="text-red-500 text-xs ml-2">upload Bank Details card </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xl text-gray-500">Documents</p>
              <p className=" border border-gray-300 mt-1"></p>
            </div>
            <div>
              {/* Adhar card */}
              <div>
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="outlined-basic"
                        label="Aadhar Number"
                        variant="outlined"
                        value={vendorForm.aadharNO}
                        onChange={(e) => setVendorForm({ ...vendorForm, aadharNO: e.target.value })}
                      />
                    </FormControl>
                    <p className="text-red-500  ml-2">Adhar number error</p>
                  </div>
                  <div>
                    {vendorForm.aadharFront == '' ? (
                      <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                        <label htmlFor="aadharFront" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                          Upload aadharFront{' '}
                        </label>{' '}
                        <input
                          type="file"
                          id="aadharFront"
                          name="aadharFront"
                          onChange={(e) => handleDocumentPhoto(e)}
                          className="text-xs w-28"
                        />
                      </p>
                    ) : (
                      <div className="flex justify-between">
                        {' '}
                        <img src={vendorForm.aadharFront} alt="aadharFront" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setVendorForm({ ...vendorForm, aadharFront: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {aadharFrontErr && <p className="text-red-500 text-xs ml-2">upload AadharFront card </p>}
                  </div>
                  <div>
                    {vendorForm.aadharBack == '' ? (
                      <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                        <label htmlFor="aadharBack" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                          Upload aadharBack{' '}
                        </label>{' '}
                        <input
                          type="file"
                          id="aadharBack"
                          name="aadharBack"
                          onChange={(e) => handleDocumentPhoto(e)}
                          className="text-xs w-28"
                        />
                      </p>
                    ) : (
                      <div className="flex justify-between">
                        {' '}
                        <img src={vendorForm.aadharBack} alt="aadharBack" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setVendorForm({ ...vendorForm, aadharBack: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {aadharBackErr && <p className="text-red-500 text-xs ml-2">upload aadharBack card </p>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:gap-7 gap-10 mt-4">
                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      type="text"
                      id="outlined-basic"
                      label="Pan Number"
                      variant="outlined"
                      value={vendorForm.panNO}
                      onChange={(e) => setVendorForm({ ...vendorForm, panNO: e.target.value })}
                    />
                  </FormControl>
                  <p className="text-red-500  ml-2">pan number error</p>
                </div>
                <div>
                  {vendorForm.pancard == '' ? (
                    <>
                      <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                        <label htmlFor="pancard" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                          Upload pancard{' '}
                        </label>{' '}
                        <input type="file" id="pancard" name="pancard" onChange={(e) => handleDocumentPhoto(e)} className="text-xs w-24" />
                      </p>
                    </>
                  ) : (
                    <div className="flex justify-between">
                      {' '}
                      <img src={vendorForm.pancard} alt="pancard" className="w-20 h-20 rounded-xl" />
                      <Button onClick={() => setVendorForm({ ...vendorForm, pancard: '' })} variant="outlined" color="error">
                        remove
                      </Button>
                    </div>
                  )}
                  {pancardErr && <p className="text-red-500 text-xs ml-2">upload pan card </p>}
                </div>

                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      type="text"
                      id="outlined-basic"
                      label="GST number"
                      variant="outlined"
                      value={vendorForm.GST_NO}
                      onChange={(e) => setVendorForm({ ...vendorForm, GST_NO: e.target.value })}
                    />
                  </FormControl>
                  <p className="text-red-500  ml-2">currAddress error</p>
                </div>
                <div>
                  {vendorForm.GST_IMG == '' ? (
                    <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                      <label htmlFor="GST_IMG" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                        Upload GST_IMG{' '}
                      </label>{' '}
                      <input type="file" id="GST_IMG" name="GST_IMG" onChange={(e) => handleDocumentPhoto(e)} className="text-xs w-24" />
                    </p>
                  ) : (
                    <div className="flex justify-between">
                      <img src={vendorForm.GST_NO} alt="GST_NO" className="w-20 h-20 rounded-xl" />
                      <Button onClick={() => setVendorForm({ ...vendorForm, GST_NO: '' })} variant="outlined" color="error">
                        remove
                      </Button>
                    </div>
                  )}
                  <p className="text-red-500 text-xs ml-2">upload GST_IMG</p>
                </div>
                <div>
                  {vendorForm.police_verification == '' ? (
                    <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                      <label htmlFor="police_verification" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                        Upload Police Verification{' '}
                      </label>{' '}
                      <input
                        type="file"
                        id="police_verification"
                        name="police_verification"
                        onChange={(e) => handleDocumentPhoto(e)}
                        className="text-xs w-24"
                      />
                    </p>
                  ) : (
                    <div className="flex justify-between">
                      <img src={vendorForm.police_verification} alt="police_verification" className="w-20 h-20 rounded-xl" />
                      <Button onClick={() => setVendorForm({ ...vendorForm, police_verification: '' })} variant="outlined" color="error">
                        remove
                      </Button>
                    </div>
                  )}
                  <p className="text-red-500 text-xs ml-2">upload police_verification </p>
                </div>
                <div>
                  {vendorForm.venderAggrement == '' ? (
                    <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                      <label htmlFor="venderAggrement" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                        Upload venderAggrement
                      </label>{' '}
                      <input
                        type="file"
                        id="venderAggrement"
                        name="venderAggrement"
                        onChange={(e) => handleDocumentPhoto(e)}
                        className="text-xs w-24"
                      />
                    </p>
                  ) : (
                    <div className="flex justify-between">
                      <img src={vendorForm.venderAggrement} alt="venderAggrement" className="w-20 h-20 rounded-xl" />
                      <Button onClick={() => setVendorForm({ ...vendorForm, venderAggrement: '' })} variant="outlined" color="error">
                        remove
                      </Button>
                    </div>
                  )}
                  <p className="text-red-500 text-xs ml-2">upload vender Aggrement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* button */}
        <div>
          <div className="flex justify-between">
            <Button variant="contained" className="bg-blue-700" onClick={handleAddVendor}>
              Add Driver
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
