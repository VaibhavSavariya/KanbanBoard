"use client";
import { Add } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import useApp from "@/app/hooks/useApp";
const tabs = {
  todo: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};
const BoardInterface = ({ tabsData, boardId, updateLastUpdated }) => {
  const [addTaskTo, setAddTaskTo] = useState("");
  const { updateBoardData } = useApp();
  const [cloneTabs, setCloneTabs] = useState(structuredClone(tabsData));
  const [addTaskLoading, setAddTaskLoading] = useState(false);
  const handleOpenAddTaskModal = useCallback((tab) => setAddTaskTo(tab), []);
  const handleAddTask = async (taskName) => {
    setAddTaskLoading(true);
    const deepClone = structuredClone(cloneTabs);
    deepClone[addTaskTo].unshift({ taskName, id: crypto.randomUUID() });
    try {
      await updateBoardData(boardId, deepClone);
      setCloneTabs(deepClone);
      setAddTaskTo("");
      updateLastUpdated();
      setAddTaskLoading(false);
    } catch (error) {
      console.log("error:", error);
      setAddTaskLoading(false);
    }
  };
  const handleRemoveTask = useCallback(async (tab, taskId) => {
    const dClone = structuredClone(cloneTabs);
    const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
    dClone[tab].splice(taskIdx, 1);
    try {
      await updateBoardData(boardId, dClone);
      setCloneTabs(dClone);
      updateLastUpdated();
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={tabs[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          addTaskLoading={addTaskLoading}
        />
      )}
      <Grid container px={2} mt={5} spacing={2}>
        {Object.keys(tabs).map((tab) => (
          <BoardTab
            tasks={cloneTabs[tab]}
            addTask={handleOpenAddTaskModal}
            key={tab}
            name={tabs[tab]}
            tab={tab}
            removeTask={handleRemoveTask}
          />
        ))}
      </Grid>
    </>
  );
};

export default BoardInterface;
