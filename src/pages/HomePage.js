import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchEntities } from "../services/swapi";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { colors } from "../styles/variables";

const HomePageContainer = styled.div`
    padding: 20px;
    text-align: center;
`;

const SectionTitle = styled.h2`
    color: ${colors.primary};
    font-size: 2.5em;
    margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
    margin-bottom: 40px;
`;
const SelectionButton = styled.button`
    background-color: ${(props) =>
        props.$active ? colors.primary : colors.secondary};
    color: ${(props) => (props.$active ? colors.teritiary : colors.text)};
    border: 2px solid ${colors.primary};
    padding: 15px 30px;
    margin: 0 15px;
    font-size: 1.2em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
        background-color: ${(props) =>
            props.$active ? colors.primary : colors.border};
        color: ${(props) => (props.$active ? colors.tertiary : colors.text)};
    }
   &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const SelectionSelect = styled.select`
    background-color: ${(props) =>
        props.$active ? colors.primary : colors.secondary};
    color: ${(props) => (props.$active ? colors.teritiary : colors.text)};
    border: 2px solid ${colors.primary};
    padding: 15px 30px;
    margin: 0 15px;
    font-size: 1.2em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
        background-color: ${(props) =>
            props.$active ? colors.primary : colors.border};
        color: ${(props) => (props.$active ? colors.tertiary : colors.text)};
    }
`;

const CardsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const PageBadge = styled.span`
    min-width: 130px;
    text-align: center;
    font-weight: 700;
    color: ${colors.secondary};
`;

const HomePage = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [data, setData] = useState(null); // guarda count, next, previous
    
    const entityTypes2 = [
        { label: "Personajes", value: "people" },
        { label: "Planetas", value: "planets" },
        { label: "Naves", value: "starships" },
        { label: "Vehículos", value: "vehicles" },
        { label: "Razas", value: "species" },
        { label: "Películas", value: "films" },
    ];
    

    useEffect(() => {
        if (!selectedType) return;

        const loadEntities = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchEntities(selectedType,page);
                setData(data);               // { count, next, previous, results }
                setEntities(data.results);
            } catch (err) {
                setError(
                    `Error al cargar los datos, intente nuevamente ${err.message}`
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadEntities();
    }, [selectedType,page]);

    const getCardDetails = (entity) => {
        switch (selectedType) {
            case "people":
                return {
                    Genero: entity.gender,
                    Estatura: entity.height,
                    Peso: entity.mass,
                    // hair_color: entity.hair_color,
                };
            case "planets":
                return {
                    Clima: entity.climate,
                    Terreno: entity.terrain,
                    Poblacion: entity.population,
                };
            case "starships":
                return {
                    model: entity.model,
                    manufacturer: entity.manufacturer,
                    cost_in_credits: entity.cost_in_credits,
                };
            case "vehicles":
                return {
                    model: entity.model,
                    manufacturer: entity.manufacturer,
                    cost_in_credits: entity.cost_in_credits,
                };
            case "species":
                return {
                    classification: entity.classification,
                    average_height: entity.average_height,
                    average_lifespan: entity.average_lifespan,
                };
            case "films":
                return {
                    director: entity.director,
                    producer: entity.producer,
                    release_date: entity.release_date,
                };
            default:
                return {};
        }
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);

        setPage(1); // reset de página al cambiar de tipo
        setEntities([]);
        setData(null);
    };

    const totalPages = data?.count ? Math.ceil(data.count / 10) : null;

    return (
        <HomePageContainer>
            <SectionTitle>Elige tu camino en la Galaxia</SectionTitle>

            {/* <ButtonContainer>
                <SelectionButton
                    $active={selectedType === "Personajes"}
                    onClick={() => handleTypeChange("people")}>
                 Personajes 
                </SelectionButton>
                <SelectionButton
                    $active={selectedType === "Planetas"}
                    onClick={() => handleTypeChange("planets")}>
                 Planetas 
                </SelectionButton>
                <SelectionButton
                    $active={selectedType === "Naves"}
                    onClick={() => handleTypeChange("starships")}>
                 Naves
                </SelectionButton>
                <SelectionButton
                    $active={selectedType === "Vehículos"}
                    onClick={() => handleTypeChange("vehicles")}>
                 Vehículos
                </SelectionButton>
                <SelectionButton
                    $active={selectedType === "Razas"}
                    onClick={() => handleTypeChange("species")}>
                 Razas
                </SelectionButton>
                <SelectionButton
                    $active={selectedType === "Películas"}
                    onClick={() => handleTypeChange("films")}>
                 Películas
                </SelectionButton>
            </ButtonContainer>     */}
{/* 
            <SelectionSelect
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}                
                style={{
                    marginLeft: 20,
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #aaa",
                }}>
                {entityTypes.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </SelectionSelect> */}

            <ButtonContainer>
                {entityTypes2.map((opt) => (
                    <SelectionButton
                        key={opt.value}
                        $active={selectedType === opt.value}
                        onClick={() => handleTypeChange(opt.value)}>
                        {opt.label}
                    </SelectionButton>
                ))}
            </ButtonContainer>

            {/* <ButtonContainer>
                {entityTypes.map((type) => (
                    <SelectionButton
                        key={type}
                        $active={selectedType === type}
                        onClick={() => handleTypeChange(type)}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectionButton>
                ))}
            </ButtonContainer> */}    

            <ButtonContainer>                
                <SelectionButton
                    disabled={loading || page <= 1 || !data?.previous}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    ◀ Anterior
                </SelectionButton>

                <PageBadge>
                    Página {page}
                    {totalPages ? ` de ${totalPages}` : ""}
                </PageBadge>

                <SelectionButton
                    disabled={loading || !data?.next}
                    onClick={() => setPage((p) => p + 1)}>
                    Siguiente ▶
                </SelectionButton>
            </ButtonContainer> 

            {loading && <LoadingSpinner />}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && selectedType && (
                <CardsGrid>
                    {entities.map((entity) => (
                        <Card
                            key={entity.url}
                            name={entity.name || entity.title}
                            type={selectedType}
                            details={getCardDetails(entity, selectedType)}
                            url={entity.url}
                        />
                    ))}
                </CardsGrid>
            )}
        </HomePageContainer>
    );
};
export default HomePage;
