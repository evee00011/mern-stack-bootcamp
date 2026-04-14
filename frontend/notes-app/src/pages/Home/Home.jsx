import React, { useState } from 'react'; 
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/Cards/EmptyCard';

const Home = () => {
  const [isSearch, setIsSearch] = useState(false);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false, 
    type: "add", 
    data: null,
  });


  // update isPinned
  const updateIsPinned = async(noteData) => {
    const noteId = noteData._id; 

      try {
        const reponse = await axiosInstance.put('/update-note-pinned/' + noteId,  {
          isPinned: !noteData.isPinned,
        });

        if (reponse.data && reponse.data.note) {
          showToastMessage('Note Updated Succesfully')
          getAllNotes()
        }
      } catch (error) {
        console.log(error);
      }
  }

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add', 
  }); 

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type, 
    });
  }
  
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: '', 
    });
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  const deleteNote = async (data) => {
    const noteId = data._id; 

    try {
      const reponse = await axiosInstance.delete('/delete-note/' + noteId);

      if (reponse.data && !reponse.data.error) {
        showToastMessage('Note Deleted Succesfully', 'delete')
        getAllNotes()
      }
    } catch (error) {
      if (error.reponse && error.reponse.data && error.response.data.message) {
        setError(error.reponse.data.message);
        console.log('An unexpected error occured, please try again.');
      }
    }
  }

  const[allNotes,setAllNotes] = useState([])
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: 'edit',
    });
  }

  //get user ingo
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  //get all notes 
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log('An unexpected error occured.');
    }
  }

  // search note
  const onSearchNote = async (query) => {
    try {
      const reponse = await axiosInstance.get('/search-notes', {
        params: {query},
      });

      if (reponse.data && reponse.data.notes) {
        setIsSearch(true);
        setAllNotes(reponse.data.notes);
      }

    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(() => {
    
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);


  return (
    <>
      <Navbar 
        userInfo={userInfo} 
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      
      <div className='px-10 container mx-auto'>
        {allNotes.length > 0 ?
         (
          <div className='grid grid-cols-3 gap-6 mt-5'>
              {allNotes.map((item, index) => (
                <NoteCard 
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned} 
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => updateIsPinned(item)}
                />
              ))}
          </div>
         ): isSearch ? 
            (
              <NoDataFound
                message="Opps! No matching data found.."
              />
            ):(
              <EmptyCard 
                message="Start creating your first notes! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!"
              />
            )
        }
      </div>

      <button 
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ ...openAddEditModal, isShown: false });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)", 
          },
        }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes 
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}

        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;