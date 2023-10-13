import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';
import useAxios from '../utils/useAxios';
import tableImage from './table.svg';
import chairImage from './chair.svg';
import AuthContext from '../context/AuthContext';
import { Box, Button, Modal, Typography } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


function Table() {
  const { logoutUser } = useContext(AuthContext)
  const params = useParams()
  const api = useAxios();
  const [tableData, setTableData] = useState([]);

  const getTable = async () => {
    const response = await api.get('/store/tableno');
    setTableData(response.data);
  };

  useEffect(() => {
    getTable();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  return (
    <div className="table-container">
      <div className=' flex flex-row-reverse'>
        <Button style={{backgroundColor: 'red',color: 'white', marginRight: 10}} onClick={handleOpen}>Logout</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to log out?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button color="primary" onClick={() => { logoutUser()}}>Yes</Button>
          <Button color="secondary" onClick={handleClose}>No</Button>            </Typography>
          </Box>
        </Modal>      </div>
      <Link to={'/orders'}>
        <div className="view-order">
          View Order
        </div>
      </Link>
      <div className="table-body">
        {tableData.map((table) => (
          <div key={table.id} className="table-row">
            <Link to={`/home/${table.id}`}>
              <div className="table-image-container">
                <img src={chairImage} alt="Chair" className="chair-image chair-left" />
                <img src={tableImage} alt="Table" className="table-image" />
                <img src={chairImage} alt="Chair" className="chair-image chair-right" />
              </div>
              <div className="table-info-container">
                <div className="table-number">Table No. {table.table_no}</div>
                <div className="table-action">Take Order <ArrowRight /></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
