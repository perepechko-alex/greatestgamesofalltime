import * as React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import HeaderNavigation from "../../components/headerNav";
import Footer from "../../components/footer";
import { EnhancedTableHead } from "../../components/enhancedTableHead";
import { stableSort, getComparator } from "../../components/sorting";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  body: {
    minHeight: "100%",
    display: "grid",
    gridTemplateRows: "1fr auto",
  },
});

const headCells = [
  { id: "rank", numeric: false, disablePadding: false, label: "Rank" },
  {
    id: "weightedpoints",
    numeric: true,
    disablePadding: false,
    label: "Weighted Points",
  },
  {
    id: "publication",
    numeric: false,
    disablePadding: false,
    label: "Publication",
  },
  {
    id: "listyear",
    numeric: false,
    disablePadding: false,
    label: "List Year",
  },
  {
    id: "listtype",
    numeric: false,
    disablePadding: false,
    label: "List Type",
  },
];

export default function Game({ gameData, metadata: { rank: overallRank } }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("rank");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <>
      <HeaderNavigation />
      <div className={classes.body}>
        <h1>
          <center>{gameData[0].name}</center>
        </h1>
        <h2>
          <center>Rank: {overallRank}</center>
        </h2>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <EnhancedTableHead
              classes={classes}
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(gameData, getComparator(order, orderBy)).map((row) => (
                <TableRow key={`${row.name} ${row.publication} ${row.listyear}`}>
                  <TableCell component="th" scope="row">
                    {getRank(row.rank, row.weightedpoints)}
                  </TableCell>
                  <TableCell align="left">{row.weightedpoints.toFixed(2)}</TableCell>
                  <TableCell align="left">{row.publication}</TableCell>
                  <TableCell align="left">{row.listyear}</TableCell>
                  <TableCell align="left">{row.listtype}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:5000/api/results`);
  const data = await res.json();
  const paths = data.map((game) => {
    return { params: { game: game.name } };
  });
  return {
    paths,
    fallback: false,
  };
};

const getRank = (rank, gameWeight) => {
  if (!rank && gameWeight === 1) return 1;
  else if (!rank && gameWeight !== 1) return "Unranked";
  else return rank;
};

export const getStaticProps = async ({ params }) => {
  const gameName = encodeURIComponent(params.game);
  const gameRes = await fetch(`http://localhost:5000/api/${gameName}`);
  const gameData = await gameRes.json();
  const metadataRes = await fetch(`http://localhost:5000/api/results/${gameName}`);
  const metadata = await metadataRes.json();
  return {
    props: { gameData, metadata }, // will be passed to the page component as props
  };
};
