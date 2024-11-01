import Box from '@mui/material/Box';
// import emptyImg from '@/assets/images/empty.png';
import emptyStateImg from "@/assets/images/emptyState2.png"

interface MyComponentProps {
    notFoundText?: string,
    containerHeight?: string,
};

const EmptyListComponent: React.FC<MyComponentProps> = ({notFoundText = 'not found', containerHeight = '30vh'}) => {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            // marginVertical: '20%',
            textAlign: "center",
            width: "100%",
            height: containerHeight
        }}>
            <img src={emptyStateImg} alt='empty image' style={{ width: 200, height: 200 }} />
            <h4 style={{
                fontSize: 20,
                textAlign: 'center',
                margin: 0
            }}>
                {notFoundText}
            </h4>
        </Box>
    )
}

export default EmptyListComponent;
