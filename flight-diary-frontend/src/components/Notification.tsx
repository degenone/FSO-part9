interface NotificationProps {
    message: string;
}

const Notification = (props: NotificationProps) => {
    const style = {
        color: 'firebrick',
        padding: '1rem 2rem',
        border: '3px solid',
        borderRadius: '0.5rem',
        width: 'max-content',
    };
    if (!props.message) return;
    return <div style={style}>{props.message}</div>;
};

export default Notification;
