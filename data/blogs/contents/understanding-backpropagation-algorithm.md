## Overview

**Backpropagation algorithm** is probably the most fundamental building block in a neural network. It was first introduced in 1960s and almost 30 years later (1989) popularized by Rumelhart, Hinton and Williams in a paper called [_"Learning representations by back-propagating errors"_](https://www.nature.com/articles/323533a0).

**The algorithm is used to effectively train a neural network through a method called chain rule**. In simple terms, after each forward pass through a network, backpropagation performs a backward pass while adjusting the model’s parameters (weights and biases).

## Define the neural network model

The 4-layer neural network consists of 4 neurons for the **input layer**, 4 neurons for the **hidden layers** and 1 neuron for the **output layer**.

![Neural Network](/blog/images/understanding-backpropagation-algorithm/nn.webp)

<figcaption>Simple 4-layer neural network illustration</figcaption>

### Input layer

The neurons, colored in purple, represent the input data. These can be as simple as scalars or more complex like vectors or multidimensional matrices.

![Input Layer](/blog/images/understanding-backpropagation-algorithm/input.webp)

<figcaption>Equation for input x_i</figcaption>

The first set of activations (a) are equal to the input values. _NB: “activation” is the neuron’s value after applying an activation function. See below._

### Hidden layers

The final values at the hidden neurons, colored in **green**, are computed using z^l — weighted inputs in layer l, and a^l— activations in layer l. For layer 2 and 3 the equations are:

- l = 2

![Hidden Layer 2](/blog/images/understanding-backpropagation-algorithm/hidden2.webp)

<figcaption>Equations for z² and a²</figcaption>

- l = 3

![Hidden Layer 3](/blog/images/understanding-backpropagation-algorithm/hidden3.webp)

<figcaption>Equations for z³ and a³</figcaption>

W² and W³ are the weights in layer 2 and 3 while b² and b³ are the biases in those layers.

Activations a² and a³ are computed using an activation function f. Typically, this **function f is non-linear** (e.g. [sigmoid](https://en.wikipedia.org/wiki/Sigmoid_function), [ReLU](<https://en.wikipedia.org/wiki/Rectifier_(neural_networks)>), [tanh](https://en.wikipedia.org/wiki/Hyperbolic_function)) and allows the network to learn complex patterns in data. We won’t go over the details of how activation functions work, but, if interested, I strongly recommend reading [this great article](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0).

Looking carefully, you can see that all of x, z², a², z³, a³, W¹, W², b¹ and b² are missing their subscripts presented in the 4-layer network illustration above. **The reason is that we have combined all parameter values in matrices, grouped by layers**. This is the standard way of working with neural networks and one should be comfortable with the calculations. However, I will go over the equations to clear out any confusion.

Let’s pick layer 2 and its parameters as an example. The same operations can be applied to any layer in the network.

- W¹ is a weight matrix of shape (n, m) where n is the number of output neurons (neurons in the next layer) and m is the number of input neurons (neurons in the previous layer). For us, n = 2 and m = 4.

![Weight Matrix](/blog/images/understanding-backpropagation-algorithm/weight.webp)

<figcaption>Equation for W¹</figcaption>

**NB: The first number in any weight’s subscript matches the index of the neuron in the next layer** (in our case this is the _Hidden_2 layer_) **and the second number matches the index of the neuron in previous layer** (in our case this is the _Input layer_).

- x is the input vector of shape (m, 1) where m is the number of input neurons. For us, m = 4.

![Input Vector](/blog/images/understanding-backpropagation-algorithm/input_vector.webp)

<figcaption>Equation for x</figcaption>

- b¹ is a bias vector of shape (n , 1) where n is the number of neurons in the current layer. For us, n = 2.

![Bias Vector](/blog/images/understanding-backpropagation-algorithm/bias.webp)

<figcaption>Equation for b¹</figcaption>

- Following the equation for z², we can use the above definitions of W¹, x and b¹ to derive “Equation for z²”:

![Z Equation](/blog/images/understanding-backpropagation-algorithm/z_equation.webp)

<figcaption>Equation for z²</figcaption>

Now carefully observe the neural network illustration from above.

![Hidden Layer 1](/blog/images/understanding-backpropagation-algorithm/hidden1.webp)

<figcaption>Input and Hidden_1 layers</figcaption>

You will see that z² can be expressed using (z_1)² and (z_2)² where (z_1)² and (z_2)² are the sums of the multiplication between every input x_i with the corresponding weight (W_ij)¹.

This leads to the same _“Equation for z²”_ and proofs that the matrix representations for z², a², z³ and a³ are correct.

### Output layer

The final part of a neural network is the output layer which produces the predicated value. In our simple example, it is presented as a single neuron, colored in **blue** and evaluated as follows:

![Output Layer](/blog/images/understanding-backpropagation-algorithm/output.webp)

<figcaption>Equation for output s</figcaption>

Again, we are using the matrix representation to simplify the equation. One can use the above techniques to understand the underlying logic.

## Forward propagation and evaluation

The equations above form network’s forward propagation. Here is a short overview:

![Forward Propagation](/blog/images/understanding-backpropagation-algorithm/forward_propagation.webp)

<figcaption>Overview of forward propagation equations colored by layer</figcaption>

The final step in a forward pass is to evaluate the **predicted output s** against an **expected output y**.

The output y is part of the training dataset (x, y) where x is the input (as we saw in the previous section).

Evaluation between s and y happens through a cost function. This can be as simple as [MSE](https://en.wikipedia.org/wiki/Mean_squared_error) (mean squared error) or more complex like [cross-entropy](http://neuralnetworksanddeeplearning.com/chap3.html).

We name this cost function C and denote it as follows:

![Cost Function](/blog/images/understanding-backpropagation-algorithm/cost.webp)

<figcaption>Equation for cost function C</figcaption>

were cost can be equal to MSE, cross-entropy or [any other cost function](https://stats.stackexchange.com/questions/154879/a-list-of-cost-functions-used-in-neural-networks-alongside-applications).

Based on C’s value, the model “knows” how much to adjust its parameters in order to get closer to the expected output y. This happens using the backpropagation algorithm.

## Backpropagation and computing gradients

According to the paper from 1989, backpropagation:

> repeatedly adjusts the weights of the connections in the network so as to minimize a measure of the difference between the actual output vector of the net and the desired output vector.

and

> the ability to create useful new features distinguishes back-propagation from earlier, simpler methods…

In other words, **backpropagation aims to minimize the cost function by adjusting network’s weights and biases**. The level of adjustment is determined by the gradients of the cost function with respect to those parameters.

One question may arise — **why computing gradients?**

To answer this, we first need to revisit some calculus terminology:

- Gradient of a function C(x_1, x_2, …, x_m) in point x is a vector of the [partial derivatives](https://en.wikipedia.org/wiki/Partial_derivative) of C in x.

![Gradient](/blog/images/understanding-backpropagation-algorithm/gradient.webp)

<figcaption>Equation for derivative of C in x</figcaption>

- [The derivative of a function C measures the sensitivity to change of the function value (output value) with respect to a change in its argument x (input value)](https://en.wikipedia.org/wiki/Derivative). In other words, the derivative tells us the direction C is going.

- The gradient shows how much the parameter x needs to change (in positive or negative direction) to minimize C.

Compute those gradients happens using a technique called [chain rule](https://en.wikipedia.org/wiki/Chain_rule).

For a single weight (w_jk)^l, the gradient is:

![Single Weight Gradient](/blog/images/understanding-backpropagation-algorithm/single_weight_gradient.webp)

<figcaption>Equations for derivative of C in a single weight (w_jk)^l</figcaption>

Similar set of equations can be applied to (b_j)^l:

![Single Bias Gradient](/blog/images/understanding-backpropagation-algorithm/single_bias_gradient.webp)

<figcaption>Equations for derivative of C in a single bias (b_j)^l</figcaption>

The common part in both equations is often called _“local gradient”_ and is expressed as follows:

![Local Gradient](/blog/images/understanding-backpropagation-algorithm/local_gradient.webp)

<figcaption>Equation for local gradient</figcaption>

The _“local gradient”_ can easily be determined using the chain rule. I won’t go over the process now but if you have any questions, please comment below.

The gradients allow us to optimize the model’s parameters:

![Optimize Parameters](/blog/images/understanding-backpropagation-algorithm/optimize_parameters.webp)

<figcaption>Algorithm for optimizing weights and biases (also called “Gradient descent”)</figcaption>

- Initial values of w and b are randomly chosen.
- Epsilon (e) is the [learning rate](https://machinelearningmastery.com/understand-the-dynamics-of-learning-rate-on-deep-learning-neural-networks/). It determines the gradient’s influence.
- w and b are matrix representations of the weights and biases. Derivative of C in w or b can be calculated using partial derivatives of C in the individual weights or biases.
- Termination condition is met once the cost function is minimized.

I would like to dedicate the final part of this section to a simple example in which we will calculate the gradient of C with respect to a single weight (w_22)².

Let’s zoom in on the bottom part of the above neural network:

![Backward Propagation](/blog/images/understanding-backpropagation-algorithm/backward_propagation.webp)

<figcaption>Visual representation of backpropagation in a neural network</figcaption>

Weight (w_22)² connects (a_2)² and (z_2)², so computing the gradient requires applying the chain rule through (z_2)³ and (a_2)³:

![Single Weight Gradient Example](/blog/images/understanding-backpropagation-algorithm/single_weight_gradient_example.webp)

<figcaption>Equation for derivative of C in (w_22)²</figcaption>

Calculating the final value of derivative of C in (a_2)³ requires knowledge of the function C. Since C is dependent on (a_2)³, calculating the derivative should be fairly straightforward.

I hope this example manages to throw some light on the mathematics behind computing gradients. To further enhance your skills, I strongly recommend watching [Stanford’s NLP series where Richard Socher gives 4 great explanations of backpropagation](https://www.youtube.com/watch?v=isPiE-DBagM&list=PL3FW7Lu3i5Jsnh1rnUwq_TcylNr7EkRe6).
