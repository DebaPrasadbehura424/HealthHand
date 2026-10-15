import kotlinx.coroutines.*

// ============================================================
// KOTLIN PRACTICE FILE (Q1 - Q12)
// HOW TO USE: In main(), uncomment ONE call (for example q1())
// and run. Each question is its own function, so variable
// names never clash with each other.
// ============================================================

/*
SYMBOL CHEAT SHEET (what it does + WHY it exists)

$name      String template. Puts a variable inside a string. Why: "+" joining is messy.
?          After a type (String?) it means "this can be null". Why: the compiler then
           forces you to handle null, so bugs show at compile time, not in front of the user.
?.         Safe call. If the left side is null, the whole expression becomes null (no crash).
?:         Elvis operator. "If left side is null, use the right side." Why: Kotlin has no
           ternary (? :), and this gives a default value for null in one short line.
!!         Not-null assertion. You tell the compiler "trust me, it is not null". If you are
           wrong it throws NullPointerException. Why avoid: it switches OFF the compile-time
           safety, and the crash happens at runtime.
..         Range, includes the last number (1..5 = 1,2,3,4,5).
until      Range, excludes the last number (1 until 5 = 1,2,3,4).
downTo     Counts backwards (10 downTo 1).
step       Jump size in a range (2..20 step 2).
in         Checks membership in a range or collection (marks in 90..100).
->         Separates the input from the body in lambdas and when-branches.
it         Default name for the single parameter of a lambda.
=          After a function header it means "single-expression function" (no { } or return).
to         Builds a pair for maps ("Deba" to 80).
Unit       Kotlin's "returns nothing" type. A real type, unlike Java's void.
*/

fun main() {
    // q1()
    // q2()
    // q3()
    // q4()
    // q5()
    // q6()
    // q7()
    // q8()
    // q9()
   //     q10()
   // q11()
    // q12()
//     q13()
//     q14()
//     q15()
//     q16()
     
    
//     Extra question 
//     Extra17();
    
//     val v : Car= Car("Name")
//     print(v.sound())
}

// ------------------------------------------------------------
// Q1: Variables and string templates
// ------------------------------------------------------------
fun q1() {
    val name = "Deba"      // val = read-only, cannot be reassigned
    val age = 13
    var city = "Cuttack"   // var = can change
    city = "Bhubaneswar"

    println("Mera naam $name hai, umar $age hai, aur main $city mein rehta hoon")

    // name = "Raj"        // ERROR: Val cannot be reassigned
    // Theory: reassigning a val gives a compile error, the program will not run.
}

// ------------------------------------------------------------
// Q2: Data types and conversion
// ------------------------------------------------------------
fun q2() {
    val age: Int = 22
    val price: Double = 99.5
    val isStudent: Boolean = true
    val grade: Char = 'A'

    println(age.toDouble())   // 22.0
    println(price.toInt())    // 99 (decimal is cut, NOT rounded)
    println(isStudent)
    println(grade)

    // Theory: Kotlin has no implicit widening. val x: Double = 5 is an error.
    // Int and Double are different types, so you must call .toDouble() yourself.
    // Why: it prevents hidden conversion bugs.
}

// ------------------------------------------------------------
// Q3: if / when / if as expression
// ------------------------------------------------------------
fun q3() {
    val marks = 76   // test the boundaries too: 90, 75, 50, 49

    // 1. if-else (note >= 90, not > 90)
    if (marks >= 90) {
        println("A")
    } else if (marks >= 75) {
        println("B")
    } else if (marks >= 50) {
        println("C")
    } else {
        println("Fail")
    }

    // 2. when with ranges
    when (marks) {
        in 90..100 -> println("A")
        in 75..89 -> println("B")
        in 50..74 -> println("C")
        else -> println("Fail")
    }

    // 3. if as an expression
    val grade = if (marks >= 90) "A"
    else if (marks >= 75) "B"
    else if (marks >= 50) "C"
    else "Fail"
    println(grade)

    // Theory: in Kotlin if returns a value, so it is an expression.
    // That is why Kotlin does not need Java's ternary ? :
}

// ------------------------------------------------------------
// Q4: Loops
// ------------------------------------------------------------
fun q4() {
    for (i in 1..10) println(i)          // 1 to 10
    for (i in 10 downTo 1) println(i)    // 10 to 1
    for (i in 2..20 step 2) println(i)   // even numbers 2 to 20

    var sum = 0
    var i = 1
    while (i <= 5) {
        sum += i      // same as sum = sum + i
        i++           // same as i = i + 1. If you forget this, the loop never ends
    }
    println(sum)      // 15

    // Theory: 1..10 includes 10, 1 until 10 does not.
    // Without i++, i stays 1, i <= 5 is always true, so the loop is infinite.
}

// ------------------------------------------------------------
// Q5: Functions
// ------------------------------------------------------------
fun add(a: Int, b: Int): Int {
    return a + b
}

fun greet(name: String) {            // returns Unit (nothing useful)
    println("Hello $name")
}

fun square(num: Int) = num * num     // single-expression function

fun greetUser(name: String, city: String = "Cuttack") {   // default argument
    println("Hello I am $name and I am from $city")
}

fun q5() {
    println(add(1, 2))                   // 3
    greet("Deba")                        // do NOT wrap in print(): it would also print kotlin.Unit
    println(square(4))                   // 16
    greetUser("Deba")                    // uses default city Cuttack
    greetUser("Deba", "Bhubaneswar")     // overrides the default

    // Theory 1: Unit is a real type with exactly one value. Java's void is "no type at all",
    //           so void cannot be used in generics. Unit can: () -> Unit, Result<Unit>.
    // Theory 2: Default arguments replace Java's many overloaded methods. One function is enough.
}

// ------------------------------------------------------------
// Q6: Null safety
// ------------------------------------------------------------
fun safeLength(s: String?): Int = s?.length ?: 0

fun q6() {
    var name: String? = null

    // println(name.length)        // ERROR: only safe calls allowed on a nullable receiver
    println(name?.length)          // null (no crash)
    println(name ?: "Unknown")     // Unknown (elvis gives a default)
    // println(name!!.length)      // CRASH: NullPointerException, because name is null

    name = "Deba"
    if (name != null) {
        println(name.length)       // 4, smart cast: compiler knows it is not null here
    }

    println(safeLength(null))      // 0
    println(safeLength("Deba"))    // 4

    // Theory 1: String cannot hold null, String? can. The compiler forces you to handle
    //           null, so the NullPointerException is caught at compile time, not at runtime.
    // Theory 2: !! tells the compiler "do not check". If you are wrong, the app crashes in
    //           front of the user. You lose the compile-time safety. Use ?. or ?: instead.
}

// ------------------------------------------------------------
// Q7: List basics
// ------------------------------------------------------------
fun q7() {
    val fruits = listOf("Apple", "Banana", "Mango")
    println(fruits.size)    // 3
    println(fruits[0])      // Apple (index starts at 0)
    println(fruits[2])      // Mango

    // fruits.add("Orange")  // ERROR: Unresolved reference: add (listOf is read-only)

    val nums = mutableListOf(1, 2, 3)
    nums.add(4)              // [1, 2, 3, 4]
    nums.remove(2)           // removes the VALUE 2 -> [1, 3, 4]. removeAt(2) removes by index
    println(nums)

    for (n in nums) println(n)
    nums.forEachIndexed { i, n -> println("$i -> $n") }

    // Theory 1: listOf is read-only, mutableListOf can change. This stops a function from
    //           secretly changing your list, and tells the reader if a list will change.
    // Theory 2: val only stops you from assigning a NEW list to the variable. Whether the
    //           items inside can change depends on the list type, not on val/var.
}

// ------------------------------------------------------------
// Q8: List functions
// ------------------------------------------------------------
fun q8() {
    val nums = listOf(5, 2, 8, 1, 9)
    val evenNum = nums.filter { it % 2 == 0 }

    println(evenNum)              // [2, 8]
    println(nums.map { it * 2 })  // [10, 4, 16, 2, 18]
    println(nums.sum())           // 25
    println(nums.sorted())        // [1, 2, 5, 8, 9]
    println(nums.contains(8))     // true

    // Theory: filter keeps only the items that pass a condition (count can shrink).
    //         map transforms every item (count stays the same).
}

// ------------------------------------------------------------
// Q9: Map and Set
// ------------------------------------------------------------
fun q9() {
    val scores = mapOf("Deba" to 80, "Raj" to 70)
    for ((name, mark) in scores) println("$name -> $mark")   // (name, mark) = destructuring

    val amit = scores["Amit"] ?: 0   // key missing -> null -> elvis gives 0
    println(amit)

    println(setOf(1, 2, 2, 3, 3))    // [1, 2, 3]

    // Theory: a Set keeps only unique values, duplicates are ignored.
    //         In a Map the keys are unique.
}

// ------------------------------------------------------------
// Q10: Class
// ------------------------------------------------------------
class Student(val name: String, var marks: Int) {
    fun isPass(): Boolean = marks >= 35
}

fun q10() {
    val s1 = Student("Deba", 80)
    val s2 = Student("Raj", 20)
    println(s1.isPass())   // true
    println(s2.isPass())   // false
    println(s1.name)

    // Theory: val/var in the constructor makes the parameter a PROPERTY (s1.name works).
    //         Without val/var it is only a constructor parameter, not accessible outside.
}

// ------------------------------------------------------------
// Q11: Data class
// ------------------------------------------------------------
data class StudentData(val name: String, var marks: Int)

fun q11() {
    val s = StudentData("Deba", 80)
    println(s)                         // StudentData(name=Deba, marks=80)
    val s2 = s.copy(marks = 90)
    println(s2)                        // StudentData(name=Deba, marks=90)
    println(s == s2)                   // false (compares values, not memory address)

    // Theory: a normal class prints something like Student@1b6d3586 because toString is not
    //         written. data class auto-generates toString, equals, hashCode and copy.
}

// ------------------------------------------------------------
// Q12: Lambda and higher-order function
// ------------------------------------------------------------
fun calc(a: Int, b: Int, op: (Int, Int) -> Int): Int = op(a, b)

fun q12() {
    val multiply = { a: Int, b: Int -> a * b }
    val add = { a: Int, b: Int -> a + b }

    println(calc(4, 5, multiply))             // 20
    println(calc(4, 5, add))                  // 9
    println(calc(4, 5) { x, y -> x - y })     // -1 (lambda passed outside the brackets)

    // Theory: a higher-order function takes a function as a parameter or returns one.
    //         calc is one, because op is a function.
}

fun String.isPalindrome():Boolean{
    var i :Int =0;
    var j :Int= this.length-1;
    while(i<j){
        if(this[i]==this[j]){
           i++;
           j--;
        }else{
           return false;
        }
    }
    return true;
    

}

fun String.shout():String = this.uppercase() + "!";

fun q13(){
    println(isPalindrome("madam"));
    print(isPalindrome("deba"));
    println("madam".isPalindrome());
}


// q14

// sealed class PaymentResult{
//     object Pending : PaymentResult()
//     class Success : (val amt : Int)->print("amount is $amt")
//     class Error : (val msg :String)->print("error")
// }

// fun show(result : PaymentResult){
// while(result){
//           is PaymentResult.Pending -> println("Wait karo")
//         is PaymentResult.Success -> println("Amount is ${result}")
//         is PaymentResult.Error -> println("Error: ${result}") 


//   }
// }

fun q14(){
//     show(PaymentResult.Pending)
//     show(PaymentResult.Success(599))
//     show(PaymentResult.Error("No money"))
}




// q15


fun q15(){

val color :String?="Red"
color?.let {println("Color is $it")}
//  if color is not null then it print the value 
// other wise not


val nums = mutableListOf<Int>().apply {
    add(1)
    add(2)
}
println(nums)  
// in which object we apply  apply() that will return same type 

}






fun applyTwice(n : Int ,op:(Int)->Int):Int = op(op(n))
fun doThrice(n:Int, op : (Int) -> Int) = op(op(op(n)))

fun operate(a:Int,b:Int,op:(Int,Int)->Int):Int= op(a,b)


fun q16(){

val double = {x:Int -> x*2}
// print(double(5))

val add = {a:Int,b:Int ->a+b}
val mul = {a:Int,b:Int ->a*b}
val sub = {a:Int,b:Int ->a-b}

val square = {x:Int -> x*x}
print(square(6))

val bro = listOf(1,2,3,4,5).filter{it >3}
println(bro)


// println(operate(5,6,add));
// println(operate(5,6,mul));
// println(operate(5,6,sub));



// higher order fucntion 
// println(applyTwice(3,{it+10}))
// println(applyTwice(3) {it+10})
// println(doThrice(2){it*3})

}


open class Vehicle (val name :String){
     open fun sound() = println("Some sound")
}

class Car(name :String) : Vehicle(name){
     override fun sound() = println("Vroom")
}

interface Clickable {
    fun onClick()
}


fun Extra17()=runBlocking{
    launch {
        delay(2000)
        println("A")
    }
    println("B")
    delay(5000)
    println("c")


}




