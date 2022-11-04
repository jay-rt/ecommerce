import styled from "@emotion/styled";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Announcement = () => {
  return <Container>Great Deals! Free Shipping on Orders over $50</Container>;
};

export default Announcement;
