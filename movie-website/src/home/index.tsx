import { ItensListRow } from "../itenslistrow";

const Home = () => { 
  return (
    <main>
      <section>
        <ItensListRow genre_id={12} row_title={"Experience Incredible Journeys"} />
        <ItensListRow genre_id={28} row_title={"Feel the Beat of Your Heart"} />
        <ItensListRow genre_id={16} row_title={"Worlds in Other Dimension"} />
        <ItensListRow genre_id={80} row_title={"Thug Life"}/>
        <ItensListRow genre_id={14} row_title={"Embrace Your Imagination"}/>
        <ItensListRow genre_id={878} row_title={"Can You Imagine Science?"} />
      </section>
    </main>
  );
};

export { Home };
