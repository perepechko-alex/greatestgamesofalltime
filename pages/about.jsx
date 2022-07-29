import * as React from "react";
import { Container } from "@material-ui/core";
import HeaderNavigation from "../components/headerNav";
import Footer from "../components/footer";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  body: {
    minHeight: "100%",
    display: "grid",
    gridTemplateRows: "1fr auto",
    fontFamily: "Helvetica Neue",
    lineHeight: "1.5em",
  },
});
export default function About() {
  const classes = useStyles();
  return (
    <>
      <HeaderNavigation />
      <div className={classes.body}>
        <Container maxWidth="sm">
          <br />
          <h2>What is this website?</h2>
          <p>
            Welcome to my corner of the internet! This project aims to determine the most critically acclaimed
            videogames of all time, based on critic lists.
          </p>
          <br />
          <h2>What lists are qualified to appear?</h2>
          <p>
            Game of the Year and Greatest Game of All Time lists of all kinds are included as long as there is some sort
            of editorial staff involved. Fan lists and individual contributor lists are disqualified and not included.
          </p>
          <p>
            In the future, I plan on adding other lists such as Game of the Decade and Greatest Games for X Platform.
          </p>
          <br />
          <h2>What is the reasoning behind the numbers in your formulas?</h2>
          <p>
            First note -- I am not a data scientist or analyst, so the formulas are base on what I believe are fair.
            They are subject to change in the future.
          </p>
          <p>
            Formulas can be found&nbsp;
            <a href={process.env.APP_ENV === "dev" ? "../formulas" : "../formulas.html"}>on the page here</a>.
          </p>
          <p>Some general notes and insights into my thinking: </p>
          <ul>
            <li>The base score for game on a GOAT list is worth twice as much as that of a GOTY winner</li>
            <li>
              The older a list is from the current year, the less points are added. This is because a game from say,
              1997 has to compete against a universe of smaller games than a game on a 2017 list. Games from within the
              last 10 years are weighed more heavily and worth more than games on lists > 10 years ago. This is a large
              reason for having a points-based system.
            </li>
            <li>Additional points are based on a percentage of where the game is ranked.</li>
            <li>
              An Unranked GOAT is similar to a ranked GOAT, but the ranking is not taken into account due to its lack of
              existence.
            </li>
            <li>
              An Unranked GOTY list will have all the games inherit the default GOTY value of 0.9, because there is no
              hierarchy. Therefore, the games are presumed to be ranked equally.
            </li>
          </ul>
          <br />
          <h2>How do you treat remakes or re-releases?</h2>
          <p>
            This was one of the most difficult things in making this list. Videogames are often re-released, remade
            and/or remastered throughout the years. I made a choice early on that a game that is a remaster or
            re-release will count towards the original game's point total (<i>Shadow of the Colossus</i>,{" "}
            <i>Halo: Anniversary</i>, <i>Demon's Souls</i> on PS5) as long as it was fundamentally the same core game.
            If a game was remade into something substantially different (the <i>Final Fantasy VII</i> and{" "}
            <i>Resident Evil 2</i> remakes), they would be counted as their own games.
          </p>
          <p>
            For specific games such as the <i>Street Fighter II</i> and <i>Tetris</i> series fo games, this was more
            difficult and came down to a judgement call. The former series were counted as one game (
            <i>Super Street Fighter II/Hyper Fighting/Turbo</i>) while Tetris was generally climbed into the main game,
            with the exception of certain unique instances that were called out (<i>Tetris Effect</i>,{" "}
            <i>Tetris Attack</i>). At the end of the day these were decisions made to consolidate a list to what I
            believe was the best representation of certain games.
          </p>
          <p>
            Where applicable, a note within the SQLite database has been included to denote what specific version of a
            game was mentioned within the appropriate list.
          </p>
          <br />
          <h2>I noticed an issue in your list, have questions, or want to leave a comment. How can I reach out?</h2>
          <p>
            Feel free to email me at <a href="mailto:greatestgamesofalltime@pm.me">greatestgamesofalltime@pm.me</a>, or
            reach out to me via DM/Tweet on <a href="https://twitter.com/alxexperience">Twitter</a>. Also feel free to
            leave an issue or request on the <a href="https://gitlab.com/perepechko.alex/acclaimedgames">Gitlab repo</a>
            !
          </p>
        </Container>
      </div>
      <Footer />
    </>
  );
}
