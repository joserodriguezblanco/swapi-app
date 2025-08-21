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

const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const SelectionButton = styled.button`
  background-color: ${(props) =>
    props.$active ? colors.primary : colors.secondary};
  color: ${(props) => (props.$active ? colors.tertiary : colors.text)};
  border: 2px solid ${colors.primary};
  padding: 12px 20px;
  font-size: 1em;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
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
  color: ${(props) => (props.$active ? colors.tertiary : colors.text)};
  border: 2px solid ${colors.primary};
  padding: 12px 16px;
  font-size: 1em;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
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
`;

const TYPE_OPTIONS = [
  { label: "Personajes", value: "people" },
  { label: "Planetas", value: "planets" },
  { label: "Naves", value: "starships" },
  { label: "Vehículos", value: "vehicles" },
  { label: "Razas", value: "species" },
  { label: "Películas", value: "films" },
];

const HomePage2 = () => {
  const [selectedType, setSelectedType] = useState(null); // 'people' si quieres por defecto
  const [entities, setEntities] = useState([]);
  const [data, setData] = useState(null); // guarda count, next, previous
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos cuando cambie el tipo o la página
  useEffect(() => {
    if (!selectedType) return;

    const loadEntities = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchEntities(selectedType, page);
        setData(response);               // { count, next, previous, results }
        setEntities(response.results || []);
      } catch (err) {
        setError(`Error al cargar los datos, intente nuevamente: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEntities();
  }, [selectedType, page]);

  const getCardDetails = (entity) => {
    switch (selectedType) {
      case "people":
        return { Género: entity.gender, Estatura: entity.height, Peso: entity.mass };
      case "planets":
        return { Clima: entity.climate, Terreno: entity.terrain, Población: entity.population };
      case "starships":
        return {
          Modelo: entity.model,
          Fabricante: entity.manufacturer,
          "Costo (créditos)": entity.cost_in_credits,
        };
      case "vehicles":
        return {
          Modelo: entity.model,
          Fabricante: entity.manufacturer,
          "Costo (créditos)": entity.cost_in_credits,
        };
      case "species":
        return {
          Clasificación: entity.classification,
          "Altura prom.": entity.average_height,
          "Vida prom.": entity.average_lifespan,
        };
      case "films":
        return {
          Director: entity.director,
          Productor: entity.producer,
          "Fecha estreno": entity.release_date,
        };
      default:
        return {};
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setPage(1);          // reset de página al cambiar de tipo
    setEntities([]);
    setData(null);
  };

  const totalPages = data?.count ? Math.ceil(data.count / 10) : null;

  return (
    <HomePageContainer>
      <SectionTitle>Elige tu camino en la Galaxia</SectionTitle>

      {/* Controles de selección */}
      {/* <ControlsRow>
        <SelectionSelect
          $active={!!selectedType}
          value={selectedType || ""}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="" disabled>— Selecciona un tipo —</option>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </SelectionSelect>
      </ControlsRow> */}

      <ButtonContainer>
        {TYPE_OPTIONS.map((opt) => (
          <SelectionButton
            key={opt.value}
            $active={selectedType === opt.value}
            onClick={() => handleTypeChange(opt.value)}
          >
            {opt.label}
          </SelectionButton>
        ))}
      </ButtonContainer>

      {/* Paginación */}
      <ButtonContainer>
        <SelectionButton
          disabled={loading || page <= 1 || !data?.previous}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ◀ Anterior
        </SelectionButton>

        <PageBadge>
          Página {page}
          {totalPages ? ` de ${totalPages}` : ""}
        </PageBadge>

        <SelectionButton
          disabled={loading || !data?.next}
          onClick={() => setPage((p) => p + 1)}
        >
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
              details={getCardDetails(entity)}
              url={entity.url}
            />
          ))}
        </CardsGrid>
      )}
    </HomePageContainer>
  );
};

export default HomePage2;
