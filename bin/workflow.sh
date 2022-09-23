#! /usr/bin/env bash

sessionName="changenow-store"
projectDir="/home/uchenna/.projects/personal/changenow-store"

function checkSessionActive () {
  local isSessionActive=$(tmux ls | grep "$sessionName")
  if [ -n "$isSessionActive" ]
  then
    tmux attach-session -t "$sessionName"
    exit
  fi
}

checkSessionActive

tmux new-session -d -s "$sessionName" -c "$projectDir"

tmux split-window -v -t top "cd '$projectDir' && bash" 
tmux split-window -h -t bottom "cd '$projectDir' && bash"
tmux split-window -h -t top "cd '$projectDir' && bash" 

tmux send-keys -t 1 'pnpm db:start' 'C-m'
tmux send-keys -t 2 'pnpm dev' 'C-m'
tmux send-keys -t 3 'pnpm backend:dev' 'C-m'
tmux send-keys -t 4 'pnpm lint:watch' 'C-m'

tmux attach-session -t "$sessionName"
