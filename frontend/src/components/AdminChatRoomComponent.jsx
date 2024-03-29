import { Toast, Button, Form } from 'react-bootstrap'
import { Fragment, useState, useEffect } from 'react'
import { setMessageReceived } from '../actions/chatActions'
import { useDispatch } from 'react-redux'

const AdminChatRoomComponent = ({
  chatRoom,
  roomIndex,
  socket,
  socketUser,
}) => {
  const dispatch = useDispatch()
  ;[window['toast' + roomIndex], window['closeToast' + roomIndex]] =
    useState(true)
  const [rerender, setRerender] = useState(false)

  const close = (socketId) => {
    window['closeToast' + roomIndex](false)
    socket.emit('admin closes chat', socketId)
  }

  const adminSubmitChatMsg = (e, elem) => {
    e.preventDefault()
    if (e.keyCode && e.keyCode !== 13) {
      return
    }
    const msg = document.getElementById(elem)
    let v = msg.value.trim()
    if (v === '' || v === null || v === false || !v) {
      return
    }
    chatRoom[1].push({ admin: msg.value })
    console.log('socU, v:', socketUser, v)
    socket.emit('admin sends message', {
      user: socketUser,
      message: v,
    })
    setRerender(!rerender)
    msg.focus()
    dispatch(setMessageReceived(false))
    setTimeout(() => {
      msg.value = ''
      const chatMessages = document.querySelector(`.cht-msg${socketUser}`)
      if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight
    }, 200)
  }

  useEffect(() => {
    const chatMessages = document.querySelector(`.cht-msg${socketUser}`)
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight
  })

  //console.log('chatR', chatRoom)

  return (
    <>
      <Toast
        show={'toast' + roomIndex}
        transition={false}
        //onClose={() => close(chatRoom[0])}
        className='ms-4 mb-5 ml-4 w-[33%] border-none mt-4'
      >
        <div className='bg-[#0000FF] text-[#fff] flex justify-between items-center px-2 h-12 rounded-t-lg'>
          <Toast.Header className='!bg-[#0000ff]'>
            <strong className='me-auto  text-[#ffffff] text-uppercase'>
              Chat with User
            </strong>
          </Toast.Header>
          <div onClick={() => close(chatRoom[0])} className='cursor-pointer'>
            X
          </div>
        </div>
        <Toast.Body>
          <div className={`cht-msg${socketUser}`}>
            {chatRoom[1].map((msg, idx) => (
              <Fragment key={idx}>
                {msg.client && (
                  <p
                    key={idx}
                    className='bg-[yellow] ms-2 text-[black] text-center p-3 rounded-pill w-[60%]'
                  >
                    <b className=' '>User wrote:</b> {msg.client}
                  </p>
                )}
                {msg.admin && (
                  <p
                    key={idx}
                    className='bg-[orange] ml-[40%] p-3 mb-1 rounded-pill w-[60%] text-center mt-1'
                  >
                    <b className=''>Admin wrote:</b> {msg.admin}
                  </p>
                )}
              </Fragment>
            ))}
          </div>

          <Form className='ml-1 mb-3 mt-2'>
            <Form.Group
              className=' flex flex-col'
              controlId={`adminChatMsg${roomIndex}`}
            >
              {/* <Form.Label>Write a message</Form.Label> */}
              <Form.Control
                onKeyUp={(e) =>
                  adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)
                }
                as='textarea'
                rows={2}
                placeholder='Write a message'
              />
            </Form.Group>
            <Button
              onClick={(e) => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)}
              className='bg-[green] p-1 mt-1 text-[#fff] rounded-lg w-[100%]'
              type='submit'
            >
              Submit
            </Button>
          </Form>
        </Toast.Body>{' '}
      </Toast>
    </>
  )
}

export default AdminChatRoomComponent
