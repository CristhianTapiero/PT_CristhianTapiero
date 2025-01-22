import React from "react";
const MyModal: React.FC<{ visible: boolean; onClose: Function; children : React.ReactNode }> = ({ visible, onClose, children }) => {
    if (!visible) return null;

    const handleOnClose = (e:any) => {
        if (e.target.id === "container" || e.target.id === "close-button") onClose();
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center"
        >
            {children}
        </div>
    );
};

export default MyModal;