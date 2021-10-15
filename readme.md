# Project 1 Documentation

## by Rashad M.

## Introduction

Welcome to Rashad's Business Trivia Game! Take turns answering 20 questions and see who gets the most points!

## Technologies Used

- HTML
- CSS
- JS
- jQuery
- AJAX
- Contentful
- Vercel

## Variables and Functions

#### Variables

| name      | type   |
| --------- | ------ |
| $game     | object |
| $rules    | object |
| $play     | object |
| game      | object |
| questions | array  |
| choices   | object |

### Functions

| name              | purpose                                  |
| ----------------- | ---------------------------------------- |
| getData()         | Gets data from content API               |
| qaGen()           | Generates Q/A Data                       |
| win()             | Activates win scenario                   |
| changeTurn()      | Changes players turns                    |
| changeScore()     | Updates player score                     |
| determinePoints() | Determines how many points a player gets |
| updateScore()     | Updates scoreboard                       |
| cursor()          | Custom mouse cursor action               |

## Challenges

I was unable to get the clock on the scoreboard working. The idea was for each player to have a certain amount of time to answer each question or else their score gets reset. There are multiple ways I could have implemented this, but time didn't allow it.

## Sources

### Alex Merced Contentful/jQuery Build Playlist

https://www.youtube.com/playlist?list=PLY6oTPmKnKbYC-NRcAFVN4_R5D3HRmKGu

### DevEd Awesome Cursor Animation With CSS & Javascript!

https://www.youtube.com/watch?v=TpwpAYi-p2w
