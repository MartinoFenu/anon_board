import { useState, useCallback } from 'react';

const useModal = defVal => {
  const [isModalVisible, setIsModalVisible] = useState(defVal);
  const [modalContent, setModalContent] = useState('');

  const showModal = useCallback(() => {
    setIsModalVisible(true)
  }, [setIsModalVisible] );

  const hideModal = useCallback(() => {
    setIsModalVisible(false)
  }, [setIsModalVisible] );

  const initiModal = useCallback(content => {
    setModalContent(content);
    showModal();
  }, [showModal]);

  return {
    isModalVisible,
    showModal,
    hideModal,
    modalContent,
    setModalContent,
    initiModal
  };
}

export default useModal;
