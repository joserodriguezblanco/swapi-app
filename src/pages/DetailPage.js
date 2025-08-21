import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import styled from "styled-components";
import {fetchEntityDetails} from "../services/swapi";
import LoadingSpinner from "../components/LoadingSpinner";
import { colors } from "../styles/variables";   

const DetailContainer = styled.div`
    padding: 40px;
    background-color: ${colors.secondary};
    border-radius: 10px;
    margin: 40px auto;
    max-width: 800px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.5);
    color: ${colors.text};
    border: 2px solid ${colors.primary};    
    `;

const DetailTitle = styled.h1`
    color: ${colors.primary};   
    font-size: 3rem;
    margin-bottom: 10px;
    text-align: center;
    text-shadow: 0 0 8px ${colors.primary};
`;

const DetailItem = styled.ul`
    font-size: 1.1rem;
    margin-bottom: 10px;
    strong {
        color: ${colors.textSecondary};
        margin-right: 5px;
    };
`;

const BackButton = styled.button`
    background-color: ${colors.primary}; 
    color: ${colors.teritiary};
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;    
    margin-top: 30px;
    transition: background-color 0.3s ease, transform 0.2s ease;    
    &:hover {
        background-color: #fce100;
        transform: scale(1.05);
    }
    &:focus {
        outline: none;
    }
`;

const EntityDetailPage = () => {
    const {encodedUrl} = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const decodedUrl = atob(decodeURIComponent(encodedUrl));
                const data = await fetchEntityDetails(decodedUrl);
                setDetails(data);
            } catch (err) {
                setError('Error al cargar la data, intente nuevamente');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [encodedUrl]); //para que cada vez quse cambie el encodedUrl se vuelva a cargar la data
    if (error) {
        return (
            <DetailContainer>
                <p style={{color:"red", textAlign:'center'}}> Error: {error} </p>
                <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
            </DetailContainer>
        );
    }
    if (!details) {
        return( 
            <DetailContainer>
                <p style={{textAlign:'center'}}> No se encontraron detalles </p>
                <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
            </DetailContainer> 
        );
    }
    if (loading) return <LoadingSpinner />;
    return (
        <DetailContainer>
            <DetailTitle>{details.name || details.title}</DetailTitle>
            {Object.entries(details).map(([key, value]) => {
                if(typeof value === 'string' && value.startsWith('http')) return null;
                if (Array.isArray(value)) return null;

                    return (
                        <DetailItem key={key}>
                            {/* <strong>{key}:</strong> {value.join(', ')} */}
                            <strong>{key.replace(/_/g,' ')}</strong>{value}
                        </DetailItem>
                    );
            })}
            <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
        </DetailContainer>                
    );
};
export default EntityDetailPage;