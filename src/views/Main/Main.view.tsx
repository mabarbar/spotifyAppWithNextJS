import React from "react";
import { GridList, GridListItem } from "~/components";
import { ModelWithId } from "~/models/Playlist.model";

interface Props {
  items: ModelWithId[] | null;
}

const Main = ({ items }: Props) => (
  <GridList>
    {items?.map((item) => (
      <GridListItem item={item} key={item.id} />
    ))}
  </GridList>
);

export default Main;
