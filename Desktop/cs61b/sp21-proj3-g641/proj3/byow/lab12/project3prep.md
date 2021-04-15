# Project 3 Prep

**For tessellating hexagons, one of the hardest parts is figuring out where to place each hexagon/how to easily place hexagons on screen in an algorithmic way.
After looking at your own implementation, consider the implementation provided near the end of the lab.
How did your implementation differ from the given one? What lessons can be learned from it?**

Answer: I did not think about using recursion for drawing rows. Everything I tried was iterative. It has inspired me to do the same with my code for the project.

-----

**Can you think of an analogy between the process of tessellating hexagons and randomly generating a world using rooms and hallways?
What is the hexagon and what is the tesselation on the Project 3 side?**

Answer: Each hexagon is a room.

-----
**If you were to start working on world generation, what kind of method would you think of writing first? 
Think back to the lab and the process used to eventually get to tessellating hexagons.**

Answer: I would start by making a method that would create basic square rooms to be put across the map. Just like with hexagons, I could
make different sizes of rooms. Then later I could focus on hallways.

-----
**What distinguishes a hallway from a room? How are they similar?**

Answer: Hallways have a width of 1 or 2 tiles and a random length, whereas rooms have random width and height.
They are similar in that both must have walls that are visually distinct from floors.
